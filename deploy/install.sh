#!/usr/bin/env bash
# Puts info.siang.co on this server. Safe to run again: it only adds its own files.
#   curl -fsSL https://raw.githubusercontent.com/kunpoj/info-siang-site/main/deploy/install.sh | sudo bash
# What it does
#   1. Copies the site from the public repo kunpoj/info-siang-site into /var/www/info.siang.co
#   2. Adds one site to the web server that already runs here (nginx, Caddy or Apache), or installs Caddy if none
#   3. Gets an HTTPS certificate (needs the DNS record info.siang.co -> this server first)
#   4. Adds a timer that pulls new versions every minute
# It stops without changing anything if port 80 is held by something it does not know (for example a Docker proxy).
# It does not touch the firewall: open ports 80 and 443 yourself first (ufw allow 80,443/tcp).
set -euo pipefail
DOMAIN=${DOMAIN:-info.siang.co}
REPO=${REPO:-https://github.com/kunpoj/info-siang-site.git}
DIR=${DIR:-/var/www/info.siang.co}
MAIL=${MAIL:-contact@siang.co}
say(){ printf '\n== %s\n' "$*"; }
[ "$(id -u)" = 0 ] || { echo "Run as root (sudo)."; exit 1; }

say "1. Site files"
command -v git >/dev/null || { apt-get update -qq && apt-get install -y -qq git; }
if [ -d "$DIR/.git" ]; then git -C "$DIR" pull -q --ff-only; else mkdir -p "$(dirname "$DIR")"; git clone -q --depth 1 "$REPO" "$DIR"; fi
WEB="$DIR/site"; [ -f "$WEB/index.html" ] || { echo "No site/index.html in the repo"; exit 1; }
echo "site at $WEB ($(git -C "$DIR" log -1 --format='%h %cd'))"

say "2. Web server"
holder=$(ss -ltnpH 'sport = :80' 2>/dev/null | grep -o 'users:(("[^"]*' | head -1 | cut -d'"' -f2 || true)
echo "port 80 is held by: ${holder:-nothing}"
case "${holder:-none}" in
  nginx)
    CONF=/etc/nginx/sites-available/$DOMAIN; [ -d /etc/nginx/sites-available ] || CONF=/etc/nginx/conf.d/$DOMAIN.conf
    sed "s#__ROOT__#$WEB#g; s#__DOMAIN__#$DOMAIN#g" "$DIR/deploy/nginx.conf" > "$CONF"
    [ -d /etc/nginx/sites-enabled ] && ln -sf "$CONF" /etc/nginx/sites-enabled/$DOMAIN
    nginx -t && systemctl reload nginx
    if ! command -v certbot >/dev/null; then apt-get install -y -qq certbot python3-certbot-nginx; fi
    certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$MAIL" --redirect || echo "!! certificate not issued yet: check the DNS record, then run: certbot --nginx -d $DOMAIN"
    ;;
  caddy|none)
    if [ "${holder:-none}" = none ]; then
      command -v caddy >/dev/null || { apt-get install -y -qq debian-keyring debian-archive-keyring apt-transport-https curl gpg
        curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
        curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' > /etc/apt/sources.list.d/caddy-stable.list
        apt-get update -qq && apt-get install -y -qq caddy; }
    fi
    mkdir -p /etc/caddy/sites
    # a fresh Caddy ships a demo site on :80; replace that stock file with one that only loads our sites
    if grep -q '/usr/share/caddy' /etc/caddy/Caddyfile 2>/dev/null; then cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.stock; printf 'import sites/*\n' > /etc/caddy/Caddyfile; fi
    BIND=${BIND:-$(ip -4 route get 1.1.1.1 | awk '{for(i=1;i<=NF;i++) if($i=="src") print $(i+1)}')}
    echo "Caddy listens on $BIND"
    sed "s#__ROOT__#$WEB#g; s#__DOMAIN__#$DOMAIN#g; s#__BIND__#$BIND#g" "$DIR/deploy/Caddyfile" > /etc/caddy/sites/$DOMAIN.caddy
    grep -q 'import sites/\*' /etc/caddy/Caddyfile 2>/dev/null || printf '\nimport sites/*\n' >> /etc/caddy/Caddyfile
    caddy validate --config /etc/caddy/Caddyfile >/dev/null && { systemctl is-active -q caddy && systemctl reload caddy || systemctl restart caddy; }
    systemctl is-active caddy
    ;;
  apache2|httpd)
    sed "s#__ROOT__#$WEB#g; s#__DOMAIN__#$DOMAIN#g" "$DIR/deploy/apache.conf" > /etc/apache2/sites-available/$DOMAIN.conf
    a2enmod -q headers rewrite expires >/dev/null; a2ensite -q $DOMAIN >/dev/null; apache2ctl configtest && systemctl reload apache2
    command -v certbot >/dev/null || apt-get install -y -qq certbot python3-certbot-apache
    certbot --apache -d "$DOMAIN" --non-interactive --agree-tos -m "$MAIL" --redirect || echo "!! certificate not issued yet: check the DNS record"
    ;;
  *)
    echo "Port 80 belongs to '$holder' (probably a Docker proxy). Nothing was changed."
    echo "Add a static site for $DOMAIN with root $WEB in that proxy, then run this again with SKIP_WEB=1."
    exit 2 ;;
esac

say "3. Auto update every minute"
cat > /etc/systemd/system/info-siang-pull.service <<UNIT
[Unit]
Description=Pull the latest info.siang.co site
[Service]
Type=oneshot
ExecStart=/usr/bin/git -C $DIR pull -q --ff-only
UNIT
cat > /etc/systemd/system/info-siang-pull.timer <<UNIT
[Unit]
Description=Pull info.siang.co every minute
[Timer]
OnBootSec=1min
OnUnitActiveSec=1min
[Install]
WantedBy=timers.target
UNIT
systemctl daemon-reload && systemctl enable --now info-siang-pull.timer >/dev/null
say "Done. Check: curl -sI https://$DOMAIN | head -3"
