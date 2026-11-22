#!/usr/bin/env bash
set -euo pipefail

# Idempotent, Always Free-only retry. It waits for host capacity and never
# falls back to a paid shape. It runs on a logged-in Mac with OCI CLI access.
PROFILE="${OCI_PROFILE:-hybridgenai123}"
REGION="${OCI_REGION:-us-chicago-1}"
TENANCY="ocid1.tenancy.oc1..aaaaaaaad7qhwlb346dz5glwm3cbmascjgatctv6oykmuqdsns6pur5hj33a"
COMPARTMENT="ocid1.compartment.oc1..aaaaaaaadbcirr7stjhaxsbim3q7nfkm5nmjwrqyv435uou6iyzmsqh5glya"
SUBNET="ocid1.subnet.oc1.us-chicago-1.aaaaaaaalhayzmdzrafuheqzgmkwi2nkwknjiilditl5plqbvgzplmfeiiha"
INSTANCE_NAME="aiopenaiacademy-free-a1"
IMAGE_ID="ocid1.image.oc1.us-chicago-1.aaaaaaaafpgtf5v5avham7e2cszyndbv45qkmy6cvlgf5tz564fbxdrtim5a"
KEY_FILE="${OCI_SSH_PUBLIC_KEY_FILE:-$HOME/.ssh/hybridgenai-adminhga.key.pub}"
LOG_DIR="${HOME}/.local/state/hybridgenai"
LOG_FILE="${LOG_DIR}/academy-a1-retry.log"

mkdir -p "$LOG_DIR"
log() { printf '%s %s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$*" >> "$LOG_FILE"; }

if [ ! -r "$KEY_FILE" ]; then log "SKIP missing SSH public key"; exit 0; fi
existing=$(oci compute instance list --region "$REGION" --profile "$PROFILE" --compartment-id "$COMPARTMENT" --all --query "data[?\"display-name\"=='$INSTANCE_NAME'] | length(@)" --raw-output 2>/dev/null || printf '0')
existing=${existing:-0}
if [ "$existing" != "0" ]; then log "SKIP instance already exists count=$existing"; exit 0; fi

for ad in BECz:US-CHICAGO-1-AD-1 BECz:US-CHICAGO-1-AD-2 BECz:US-CHICAGO-1-AD-3; do
  status=$(oci compute compute-capacity-report create --region "$REGION" --profile "$PROFILE" --compartment-id "$TENANCY" --availability-domain "$ad" --shape-availabilities '[{"instanceShape":"VM.Standard.A1.Flex","instanceShapeConfig":{"ocpus":1,"memoryInGBs":6}}]' --query 'data."shape-availabilities"[0]."availability-status"' --raw-output 2>/dev/null || printf 'UNKNOWN')
  log "capacity ad=$ad status=$status"
  if [ "$status" = "AVAILABLE" ]; then
    result=$(oci compute instance launch --region "$REGION" --profile "$PROFILE" --availability-domain "$ad" --compartment-id "$COMPARTMENT" --display-name "$INSTANCE_NAME" --shape VM.Standard.A1.Flex --shape-config '{"ocpus":1,"memoryInGBs":6}' --subnet-id "$SUBNET" --assign-public-ip true --source-details "{\"sourceType\":\"image\",\"imageId\":\"$IMAGE_ID\",\"bootVolumeSizeInGBs\":50}" --metadata "$(/usr/bin/python3 -c 'import json,sys; print(json.dumps({"ssh_authorized_keys":open(sys.argv[1]).read()}))' "$KEY_FILE")" --freeform-tags '{"Application":"AIOpenAIAcademy","Environment":"free","ManagedBy":"retry-free-a1"}' --query 'data.{id:id,state:"lifecycle-state"}' 2>&1 || true)
    log "launch ad=$ad result=$(printf '%s' "$result" | tr '\n' ' ' | cut -c1-500)"
    exit 0
  fi
done

log "SKIP no A1 host capacity"
