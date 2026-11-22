#!/usr/bin/env bash
set -euo pipefail

: "${ACADEMY_HOST:?Set ACADEMY_HOST to the new Academy host IP or SSH alias}"
: "${ACADEMY_SSH_USER:=opc}"
: "${ACADEMY_SSH_KEY:?Set ACADEMY_SSH_KEY to the SSH private key path}"
: "${ACADEMY_SITE_URL:?Set ACADEMY_SITE_URL to the intended site origin}"
: "${ACADEMY_POSTGRES_PASSWORD:?Set ACADEMY_POSTGRES_PASSWORD without printing it}"
: "${ACADEMY_REMOTE_DIR:=/opt/aiopenaiacademy}"
: "${ACADEMY_WEB_PORT:=80}"

repo_root=$(cd "$(dirname "$0")/../.." && pwd)
archive="$(mktemp -t aiopenaiacademy-deploy).tar.gz"
trap 'rm -f "$archive"' EXIT

tar -czf "$archive" \
  --exclude=.git \
  --exclude=.next \
  --exclude=node_modules \
  --exclude=Reports/oci_docx_render* \
  -C "$repo_root" .

ssh -i "$ACADEMY_SSH_KEY" -o BatchMode=yes -o StrictHostKeyChecking=accept-new "$ACADEMY_SSH_USER@$ACADEMY_HOST" "sudo mkdir -p '$ACADEMY_REMOTE_DIR' && sudo chown '$ACADEMY_SSH_USER' '$ACADEMY_REMOTE_DIR'"
scp -i "$ACADEMY_SSH_KEY" "$archive" "$ACADEMY_SSH_USER@$ACADEMY_HOST:/tmp/aiopenaiacademy.tar.gz"

ssh -i "$ACADEMY_SSH_KEY" "$ACADEMY_SSH_USER@$ACADEMY_HOST" \
  "set -e; mkdir -p '$ACADEMY_REMOTE_DIR'; tar -xzf /tmp/aiopenaiacademy.tar.gz -C '$ACADEMY_REMOTE_DIR'; rm -f /tmp/aiopenaiacademy.tar.gz; command -v docker >/dev/null || { echo 'Docker is required'; exit 1; };"

ssh -i "$ACADEMY_SSH_KEY" "$ACADEMY_SSH_USER@$ACADEMY_HOST" \
  "cd '$ACADEMY_REMOTE_DIR' && printf '%s\\n' 'POSTGRES_USER=academy' 'POSTGRES_DB=academy' 'POSTGRES_PASSWORD=$ACADEMY_POSTGRES_PASSWORD' 'WEB_PORT=$ACADEMY_WEB_PORT' 'NEXT_PUBLIC_SITE_URL=$ACADEMY_SITE_URL' > .env && docker compose -p aiopenaiacademy up --build -d"

echo "Academy deployment requested on $ACADEMY_HOST"
