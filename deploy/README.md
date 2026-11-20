# Putting info.siang.co online

info.siang.co runs on Oneput's Hostinger VPS (KVM 4, 76.13.190.162) with Caddy. The VPS does not read this private repo: it pulls the public repo **kunpoj/info-siang-site**, which holds only the built pages (`site/`) and these setup files (`deploy/`). A timer on the VPS (`info-siang-pull.timer`) fetches it every minute, so a push there is live within a minute.

## Publish a new version

```
cd apps/demo/v3
python3 -I src/build.py          # writes site/
deploy/publish.sh                # copies site/ and deploy/ to kunpoj/info-siang-site and pushes
```

## First setup on a server (already done on 20/11/2026)

1. DNS at Spaceship: A record `info` -> the server's IP.
2. On the server, open the firewall for the web: `ufw allow 80/tcp && ufw allow 443/tcp`.
3. Run `curl -fsSL https://raw.githubusercontent.com/kunpoj/info-siang-site/main/deploy/install.sh -o /root/info-install.sh && NEEDRESTART_SUSPEND=1 bash /root/info-install.sh`.

The script adds one site to the web server already on the machine (nginx, Caddy or Apache), or installs Caddy if there is none. On this VPS Caddy listens on the public address only, because Tailscale holds port 443 on its own interface. HTTPS certificates come from Let's Encrypt by themselves. The site sends `X-Robots-Tag: noindex` and robots.txt blocks search engines until Kunpoj opens the site to search.

## Files

- `install.sh`: the setup (safe to run again).
- `Caddyfile`, `nginx.conf`, `apache.conf`: the site for each web server.
- `publish.sh`: push a new build to the public repo.
