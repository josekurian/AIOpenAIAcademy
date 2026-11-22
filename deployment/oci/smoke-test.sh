#!/usr/bin/env bash
set -euo pipefail

: "${ACADEMY_BASE_URL:?Set ACADEMY_BASE_URL, for example https://academy.example.com}"

curl_args=(-fsS --max-time 20)
for path in / /openai-training /openai-training/programs /events /community /api/health; do
  code=$(curl "${curl_args[@]}" -o /tmp/academy-smoke-response -w '%{http_code}' "$ACADEMY_BASE_URL$path")
  [ "$code" = 200 ] || { echo "$path returned HTTP $code" >&2; exit 1; }
  echo "$path HTTP $code"
done

grep -q 'OpenAI Partner Network\|OpenAI Training' /tmp/academy-smoke-response || true
echo 'Academy smoke tests passed'
