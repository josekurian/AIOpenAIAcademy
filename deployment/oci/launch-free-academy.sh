#!/usr/bin/env bash
set -euo pipefail

: "${OCI_PROFILE:=adminHGA}"
: "${OCI_COMPARTMENT_ID:?Set OCI_COMPARTMENT_ID to the Academy compartment OCID}"
: "${OCI_AVAILABILITY_DOMAIN:?Set OCI_AVAILABILITY_DOMAIN to the selected home-region AD}"
: "${OCI_SUBNET_ID:?Set OCI_SUBNET_ID to the Academy public subnet OCID}"
: "${OCI_VCN_ID:?Set OCI_VCN_ID to the Academy VCN OCID}"
: "${OCI_SSH_PUBLIC_KEY_FILE:?Set OCI_SSH_PUBLIC_KEY_FILE to an authorized public-key file}"
: "${OCI_INSTANCE_NAME:=aiopenaiacademy-free-a1}"
: "${OCI_IMAGE_ID:?Set OCI_IMAGE_ID to an Always Free eligible Oracle Linux ARM image OCID}"
: "${OCI_REGION:=us-chicago-1}"
: "${OCI_SOURCE_CIDR:=0.0.0.0/0}"

if [ ! -r "$OCI_SSH_PUBLIC_KEY_FILE" ]; then
  echo "SSH public key file is not readable: $OCI_SSH_PUBLIC_KEY_FILE" >&2
  exit 1
fi

echo "Creating a dedicated Academy NSG in $OCI_COMPARTMENT_ID"
nsg_id=$(oci network nsg create \
  --profile "$OCI_PROFILE" \
  --compartment-id "$OCI_COMPARTMENT_ID" \
  --vcn-id "$OCI_VCN_ID" \
  --display-name "aiopenaiacademy-nsg" \
  --freeform-tags '{"Application":"AIOpenAIAcademy","Environment":"free"}' \
  --query 'data.id' --raw-output)

oci network nsg rules add --profile "$OCI_PROFILE" --nsg-id "$nsg_id" --security-rules '[
  {"direction":"INGRESS","protocol":"6","source":"'$OCI_SOURCE_CIDR'","source-type":"CIDR_BLOCK","tcp-options":{"destination-port-range":{"min":22,"max":22}},"description":"SSH from approved source; narrow OCI_SOURCE_CIDR before use"},
  {"direction":"INGRESS","protocol":"6","source":"0.0.0.0/0","source-type":"CIDR_BLOCK","tcp-options":{"destination-port-range":{"min":80,"max":80}},"description":"HTTP redirect or health endpoint"},
  {"direction":"INGRESS","protocol":"6","source":"0.0.0.0/0","source-type":"CIDR_BLOCK","tcp-options":{"destination-port-range":{"min":443,"max":443}},"description":"HTTPS Academy ingress"}
]' >/dev/null

instance_id=$(oci compute instance launch \
  --profile "$OCI_PROFILE" \
  --availability-domain "$OCI_AVAILABILITY_DOMAIN" \
  --compartment-id "$OCI_COMPARTMENT_ID" \
  --display-name "$OCI_INSTANCE_NAME" \
  --shape VM.Standard.A1.Flex \
  --shape-config '{"ocpus":2,"memoryInGBs":12}' \
  --subnet-id "$OCI_SUBNET_ID" \
  --nsg-ids "[\"$nsg_id\"]" \
  --assign-public-ip true \
  --image-id "$OCI_IMAGE_ID" \
  --metadata "$(/usr/bin/python3 -c 'import json,sys; print(json.dumps({"ssh_authorized_keys":open(sys.argv[1]).read()}))' "$OCI_SSH_PUBLIC_KEY_FILE")" \
  --freeform-tags '{"Application":"AIOpenAIAcademy","Environment":"free","ManagedBy":"deployment/oci"}' \
  --wait-for-state RUNNING \
  --query 'data.id' --raw-output)

public_ip=$(oci compute instance list-vnics --profile "$OCI_PROFILE" --instance-id "$instance_id" --query 'data[0]."public-ip"' --raw-output)
echo "instance_id=$instance_id"
echo "public_ip=$public_ip"
echo "nsg_id=$nsg_id"
