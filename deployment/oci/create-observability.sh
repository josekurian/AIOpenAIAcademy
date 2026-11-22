#!/usr/bin/env bash
set -euo pipefail

: "${OCI_PROFILE:=adminHGA}"
: "${OCI_COMPARTMENT_ID:?Set OCI_COMPARTMENT_ID to the Academy compartment OCID}"
: "${OCI_METRIC_COMPARTMENT_ID:=$OCI_COMPARTMENT_ID}"
: "${OCI_TOPIC_NAME:=academy-critical}"
: "${OCI_TOPIC_DESCRIPTION:=Critical AIOpenAIAcademy deployment alerts}"

topic_id=$(oci ons topic list --profile "$OCI_PROFILE" --compartment-id "$OCI_COMPARTMENT_ID" --all --query "data[?name=='$OCI_TOPIC_NAME'].\"topic-id\" | [0]" --raw-output)
if [ -z "$topic_id" ] || [ "$topic_id" = "null" ]; then
  topic_id=$(oci ons topic create --profile "$OCI_PROFILE" --compartment-id "$OCI_COMPARTMENT_ID" --name "$OCI_TOPIC_NAME" --description "$OCI_TOPIC_DESCRIPTION" --query 'data."topic-id"' --raw-output)
fi

create_alarm() {
  local name="$1" namespace="$2" query="$3" severity="$4"
  if oci monitoring alarm list --profile "$OCI_PROFILE" --compartment-id "$OCI_COMPARTMENT_ID" --all --query "data[?\"display-name\"=='$name'] | length(@)" --raw-output | grep -q '^0$'; then
    oci monitoring alarm create \
      --profile "$OCI_PROFILE" \
      --compartment-id "$OCI_COMPARTMENT_ID" \
      --metric-compartment-id "$OCI_METRIC_COMPARTMENT_ID" \
      --display-name "$name" \
      --namespace "$namespace" \
      --query-text "$query" \
      --severity "$severity" \
      --destinations "[\"$topic_id\"]" \
      --is-enabled true \
      --resolution 1m \
      --pending-duration PT5M \
      --message-format ONS_OPTIMIZED \
      --body "AIOpenAIAcademy alert. Follow the deployment runbook and record the outcome." >/dev/null
  fi
}

create_alarm 'Academy CPU high' 'oci_computeagent' 'CpuUtilization[5m].mean() > 80' 'WARNING'
create_alarm 'Academy object storage growth' 'oci_objectstorage' 'ObjectCount[1h].mean() > 10000' 'WARNING'

echo "topic_id=$topic_id"
echo 'Baseline observability resources created or already present.'
