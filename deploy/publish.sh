#!/usr/bin/env bash
# Copies the built site and these setup files to the public repo the VPS pulls from, then pushes.
set -euo pipefail
HERE=$(cd "$(dirname "$0")/.." && pwd)
PUB=${PUB:-$HOME/info-siang-site}
[ -d "$PUB/.git" ] || git clone -q --depth 1 https://github.com/kunpoj/info-siang-site "$PUB"
git -C "$PUB" fetch -q --depth 1 origin main && git -C "$PUB" reset -q --hard origin/main
rm -rf "$PUB/site" "$PUB/deploy" && cp -R "$HERE/site" "$PUB/site" && cp -R "$HERE/deploy" "$PUB/deploy"
cd "$PUB"
git add -A
if git diff --cached --quiet; then echo "Nothing new to publish."; exit 0; fi
git commit -qm "Publish $(date +%d/%m/%Y\ %H:%M) from natch-ptc/siang demo $(git -C "$HERE" rev-parse --short HEAD 2>/dev/null || echo local)"
git -c push.negotiate=true push -q origin main
echo "Pushed. info.siang.co shows it within a minute."
