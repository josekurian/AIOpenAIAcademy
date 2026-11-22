# OCI Academy deployment, backup, and free-tier review

**Review date:** November 21, 2026 (America/Chicago)  
**Scope:** Read-only review of the OCI profiles available through `~/.oci/config`, the active OCI resources in the associated tenancies, the local wallet inventory, and the current `GenAIInstance` server.  
**Report location:** `/Users/josekurian/AIOpenAIAcademy/Reports/OCI_Academy_Deployment_Backup_and_Free_Tier_Review_2026-11-21.md`

> The requested absolute `/Reports` directory could not be created because the host filesystem exposes `/` as read-only. This report is saved in the project-local `Reports` directory instead.

## Executive conclusion

The Academy can run on OCI, but the current Always Free server is already a shared production-style host with limited headroom:

- `GenAIInstance` is a 2 OCPU / 12 GB RAM `VM.Standard.A1.Flex` instance.
- The root filesystem is 36 GB with only about 6.3 GB free (83% used).
- Docker is running 12 active containers, including several frontends, APIs, databases, Redis, MinIO, and scanners.
- Port `3180` is currently unused, so a temporary isolated Academy container could bind there.
- The existing public load balancer already routes to the server and has no obvious spare load-balancer allocation: the tenancy limit is one flexible load balancer and one is active.
- No boot-volume backup or custom image backup was found for `GenAIInstance`.

The safest practical order is:

1. Create and verify a boot-volume backup immediately.
2. Create a custom image and export it to an Object Storage bucket if a portable disaster-recovery copy is required.
3. Keep the Academy isolated from the existing Jobs/OpenAI containers and databases.
4. Deploy first on port `3180` for validation, then add a reviewed Caddy/load-balancer route only after the domain, TLS, rollback, and storage plan are confirmed.
5. Use a separate Autonomous Database only if the application is intentionally migrated from PostgreSQL to Oracle. Existing ATP/Autonomous databases are not drop-in PostgreSQL replacements.

## Tenancies and profiles reviewed

The usable profiles in `~/.oci/config` resolve to two distinct tenancies. Several profile names are aliases for the same tenancy.

### `hybridgenai`

Profiles that authenticated successfully included `1DEFAULT`, `HGA`, `Default`, and `DEFAULT-HGA123`.

Active compartments observed:

- `hybridgenai-ai-oci`
- `hybridgenai-free-lab`
- `hybridgenai-paas`
- `Integration`
- `ManagedCompartmentForPaaS`

Resources observed:

- One running compute instance: `GenAIInstance`
- One active flexible load balancer: `hgai-free-lb`
- Three active Autonomous databases visible through resource search: `JobsHcsMetricsDB`, `InvoiceVectorDB`, and `HybridAWDB`
- Five Object Storage buckets: `BlessonBucket`, `HCSBucket`, `HCSFreeLab`, `Invoices`, and `pdfProcess`
- One VCN named `HCSVCN` was visible in the `Integration` compartment

### `adminHybridGenai`

Profile reviewed: `adminHGA`.

Active compartment observed:

- `AIJobSite-Production`

Resources observed:

- No compute instance found through resource search
- No load balancer found through resource search
- One VCN: `jobs-vcn` with CIDR `10.20.0.0/16`
- Active Autonomous databases: `HcsAgentDB` and `JobsTuneDB`
- A terminated Autonomous resource named `HybridApex`
- Five Object Storage buckets: `epm-integ-audit`, `epm-integ-dm-inbox`, `epm-integ-sample-stage`, `hybridgenai-hybridaidp`, and `hybridgenai-hybridaidp-payment`

The `config_hybrid` file contains additional profiles that did not produce a usable authenticated inventory through the current CLI configuration. They were not treated as verified tenancies.

## Current `GenAIInstance` assessment

The running server was identified through OCI resource search and SSH inventory.

| Property | Observed value |
|---|---|
| Instance | `GenAIInstance` / `genaiinstance` |
| State | Running |
| Shape | `VM.Standard.A1.Flex` |
| Allocated CPU | 2 OCPUs / 2 vCPUs |
| Allocated memory | 12 GB |
| OS | Oracle Linux Server 8.10 |
| Uptime | More than 13 weeks at review time |
| Root filesystem | 36 GB total, 30 GB used, 6.3 GB available |
| Swap | 4 GB total, mostly free |
| Public HTTP | Responded successfully; it served the HybridGenAI Jobs site |
| Port 3180 | Not listening at review time |

The server currently runs these classes of workloads:

- `oci-hybridopenai-frontend` and `oci-hybridopenai-api`
- `hcs-frontend`, `hcs-api`, and `hcs-caddy`
- `aijobsite-scheduler` and `aijobsite-api-gateway`
- `hcs-postgres`, `hcs-redis`, `hcs-minio`, and `aijobsite-scanner-1`
- `oci-hybridopenai-db`

Docker reported approximately 4.8 GB of images and 4.8 GB of reclaimable build cache. Reclaiming cache could recover space, but it is a production-host change and was not performed. The server’s process list also showed ClamAV consuming close to 1 GB resident memory, while Docker and database services consume additional memory.

### Hosting implications

The Academy’s Compose setup expects a web container and a PostgreSQL container. It can technically run on this host with `WEB_PORT=3180`, but the following risks must be addressed first:

- 6.3 GB free disk is too little for comfortable image builds, database growth, logs, and rollback images.
- Two OCPUs are shared by many services; Academy builds and PostgreSQL activity may cause contention.
- The existing Caddy service owns host ports 80 and 443. The Academy cannot bind those ports directly.
- The load balancer’s current backend points at `10.1.0.166` on ports 80 and 443. A new public Academy route needs a Caddy hostname/path configuration or a deliberate load-balancer backend/listener change.
- Reusing an existing PostgreSQL or application volume would create data-ownership and rollback risks. The Academy should use a separate named volume and database credentials.

## Backup and image options

### Option A — OCI boot-volume backup: recommended first action

The instance has a 47 GB boot volume, but no boot-volume backups were found. An OCI boot-volume backup is the most direct recovery mechanism for the current boot disk.

Conceptual CLI sequence; not executed during this review:

```bash
# Resolve the instance, compartment, availability domain, and boot-volume ID first.
oci bv boot-volume-backup create \
  --boot-volume-id <BOOT_VOLUME_OCID> \
  --display-name GenAIInstance-boot-2026-11-21 \
  --type FULL \
  --wait-for-state AVAILABLE
```

Advantages:

- Fastest recovery path for the current OCI instance.
- OCI manages the backup object and restore workflow.
- Does not require generating a large exported image file in an Object Storage bucket.

Limitations:

- It is not a portable file in a user-managed bucket.
- It does not replace application-level backups for PostgreSQL, Redis, MinIO, or other stateful services.
- Backup retention and cost/free-tier status must be confirmed in the Console; the current report did not create a backup.

### Option B — Custom image exported to Object Storage

OCI supports creating a custom image from an instance and exporting it to Object Storage. The `.oci` format is the preferred portable OCI format for importing into another tenancy or region. OCI also documents QCOW2, VMDK, VHD, and VDI export formats.

Conceptual CLI sequence; not executed:

```bash
oci compute image create \
  --instance-id <INSTANCE_OCID> \
  --compartment-id <COMPARTMENT_OCID> \
  --display-name GenAIInstance-image-2026-11-21

oci compute image export to-object \
  --image-id <IMAGE_OCID> \
  --namespace <OBJECT_STORAGE_NAMESPACE> \
  --bucket-name HCSFreeLab \
  --name backups/genaiinstance-2026-11-21.oci \
  --export-format OCI
```

Important considerations:

- The current boot volume is 47 GB. The exported object may exceed the 20 GB Always Free Object Storage allowance, depending on compression and other bucket usage.
- Exporting an image captures the boot volume and instance metadata, not a consistent backup of every external database or object-store volume.
- The target bucket needs the correct Object Storage write permissions.
- Do not put wallet passwords, private keys, `.env` files, or database dumps into an exported image without first reviewing the image contents.
- A custom image is not a substitute for a tested restore. Launch a disposable instance from it and verify the application.

### Option C — Instance configuration plus application backup

For a cleaner migration, record the instance shape, subnet, security rules, Caddy configuration, Docker Compose files, image tags, named volumes, and DNS/TLS configuration. Back up application data separately:

- PostgreSQL: logical dump plus restore test, or a database-native backup.
- Redis: only if durable state is required.
- MinIO: object-level replication or bucket backup.
- Caddy: configuration and certificate strategy, without copying private keys into GitHub.
- OCI resources: Terraform/OCI CLI declarations where practical, with secrets stored in Vault or a secret manager.

This approach is slower than an image restore but produces a cleaner and more supportable deployment.

## Moving the Academy to another OCI instance

### Move to a new A1 instance in `hybridgenai`

Current observed quota values show the tenancy’s Always Free A1 allowance at 2 OCPUs and 12 GB memory, and the existing `GenAIInstance` already uses that allocation. A second A1 instance in the same tenancy should not be assumed to be available without resizing or moving the current instance.

Possible approach:

1. Create a custom image or boot-volume backup.
2. Reduce or stop the current A1 workload only after a tested backup.
3. Launch a replacement A1 instance in the same VCN/subnet or a reviewed new subnet.
4. Restore or recreate the containers and data.
5. Validate on a temporary port.
6. Update Caddy/load-balancer routing after smoke tests.

This is a migration project, not a zero-downtime move, because the tenancy has no spare A1 capacity identified in the current inventory.

### Move to `adminHybridGenai`

This tenancy has no compute instance and no load balancer in the inventory, but its Always Free limit values also show an A1 allowance of 2 OCPUs and 12 GB memory plus two E2 Micro instances. It has a VCN and active Autonomous databases.

This is a viable clean-isolation target if:

- A public subnet, internet gateway, route table, security list/NSG, and public IP are created or confirmed.
- The Academy is deployed on the new A1 instance.
- Caddy or another TLS-capable reverse proxy is installed on that instance, or a paid/existing ingress path is provided.
- DNS and TLS are configured for a dedicated Academy hostname.

It is not currently a ready-to-use hosting slot. Creating the instance and networking resources would be a state-changing deployment action and was not performed.

### Use E2 Micro instances

The inventory shows the Always Free E2 Micro allowance in each reviewed tenancy. E2 Micro provides only 1 GB RAM and is a poor fit for the Academy’s Docker Compose stack with Next.js, PostgreSQL, and build tooling.

E2 Micro can be useful for:

- A lightweight reverse proxy or redirector.
- A small monitoring or health-check service.
- A static-only frontend if the application is redesigned and database/API work is moved elsewhere.

It is not recommended for the current full Academy stack.

### Use OKE

No OKE cluster was found. Creating OKE would add operational complexity and is not compatible with the current Always Free capacity profile without careful sizing. The Academy does not currently need Kubernetes.

## Always Free resources observed and possible use

Oracle’s current Always Free documentation states that a tenancy can use Always Free compute, Autonomous Database, load balancing, block volume, Object Storage, Vault, certificates, and related services in the home region. The exact quota values observed in this account are more restrictive than a generic marketing summary in some areas and should be treated as authoritative for planning.

| Resource | `hybridgenai` | `adminHybridGenai` | Academy recommendation |
|---|---:|---:|---|
| A1 Flex | 2 OCPUs / 12 GB allowance; used by `GenAIInstance` | 2 OCPUs / 12 GB allowance; no instance found | Best isolated target, but requires a new host in admin tenancy |
| E2 Micro | Allowance visible; no instance found | Allowance visible; no instance found | Monitoring/proxy only, not full stack |
| Flexible load balancer | 1 limit; `hgai-free-lb` active | 1 limit; none found | Existing one is already consumed; do not plan on a second free LB |
| Autonomous Database | 3 active resources visible | 2 active resources visible | Use only with owner/schema review |
| Object Storage | 5 buckets | 5 buckets | Candidate for exports/backups after usage and retention review |
| OKE | No cluster found | No cluster found | Not needed for this site |

The current Object Storage API inventory could not reliably return object counts for every bucket under the available permissions. Some buckets returned counts, but others returned null or authorization-related responses. Before selecting a bucket for image export, check actual usage in the OCI Console and confirm retention/lifecycle policies.

## Can the current ATP/Autonomous databases host the new website?

### Short answer

Yes, but not without application changes. The current Academy site is designed around PostgreSQL and the Node `pg` driver. Oracle Autonomous Database/ATP is Oracle Database, not PostgreSQL, so it is not a drop-in replacement.

### Required application changes

To use Autonomous Database, the Academy would need:

- An Oracle Node.js driver such as `oracledb`.
- Wallet or TLS connection configuration, with secrets injected at runtime.
- Oracle-compatible schema and migrations.
- Rewritten SQL for PostgreSQL-specific types, syntax, parameter placeholders, and behavior.
- Transaction, timestamp, JSON, text-search, and UUID compatibility review.
- A new database adapter and integration tests against a disposable Oracle schema.
- A data ownership decision for any existing ADB; the current application must not share an unrelated production schema.

Oracle documents Node.js connectivity to Autonomous Database both with wallets/mTLS and with TLS without a wallet. The locally available wallets make mTLS technically possible, but the report did not read or print wallet passwords or connect to application schemas.

### Existing databases found

The following active ADB resources were visible:

| Tenancy | Database | Observed state/workload | Safe interpretation |
|---|---|---|---|
| `hybridgenai` | `JobsHcsMetricsDB` | AVAILABLE, OLTP, 19c, 1 ECPU | Existing Jobs metrics workload; do not reuse without owner approval |
| `hybridgenai` | `InvoiceVectorDB` | AVAILABLE, OLTP, 23ai, 1 ECPU | Potential vector-capable database, but appears dedicated to invoice/vector workloads |
| `hybridgenai` | `HybridAWDB` | AVAILABLE resource visible; detailed read was incomplete | Confirm workload, schema, and billing before considering use |
| `adminHybridGenai` | `HcsAgentDB` | AVAILABLE, OLTP, 19c, 1 ECPU | Existing agent workload; do not reuse without schema isolation |
| `adminHybridGenai` | `JobsTuneDB` | AVAILABLE, OLTP, 19c, 1 ECPU | Existing Jobs tuning workload; do not reuse without owner approval |

The active databases exposed public connectivity metadata and no private endpoint was observed in the reviewed details. That increases the importance of wallet/TLS controls, network access restrictions, strong passwords, least-privilege users, and schema isolation.

### Recommended database choice

For the current Academy MVP:

1. Keep PostgreSQL in an isolated container for the first OCI deployment, because that matches the code and avoids a risky database rewrite.
2. If the goal is to use Oracle services, create a dedicated schema/database only after confirming whether a separate Always Free ADB slot is available and whether the application’s lead-capture requirements justify the migration.
3. Treat `InvoiceVectorDB`, `JobsHcsMetricsDB`, `HcsAgentDB`, and `JobsTuneDB` as owned workloads, not spare databases.
4. Do not copy wallet files into GitHub or the public website. Store them outside the image where possible, or use Vault/secret injection.

## Wallet inventory

Wallet directories were found for:

- `AIDB`
- `HcsAgentDB`
- `JobsHcsMetricsDB`
- `JobsTuneDB`
- `invoice_vector_db_wallet`

Wallet bundles contain Oracle client files such as `cwallet.sso`, `ewallet.p12`, `tnsnames.ora`, `sqlnet.ora`, Java keystores, and JDBC properties. Password files were present for several wallets. Their contents were not printed, copied, or included in this report.

The wallet directory permissions should be reviewed because some non-password wallet files are group/world-readable on the local workstation. Recommended controls:

- Keep wallet directories at owner-only permissions where possible.
- Rotate database passwords if any wallet/password file may have been exposed.
- Do not commit wallets, password files, `.env` files, or private keys to GitHub.
- Prefer OCI Vault or a managed secret injection mechanism for deployment.
- Use separate database users for the Academy rather than existing application users.

## Recommended target architectures

### Target 1 — Lowest-risk pilot

Use the existing `GenAIInstance` temporarily:

- Keep the current Caddy and load-balancer configuration unchanged initially.
- Run the Academy web container on `127.0.0.1:3180` or a controlled Docker network port.
- Run a separate PostgreSQL container and volume.
- Validate the site directly on the host before exposing it publicly.
- Do not perform Docker image cleanup or compose changes until a host backup exists.

This is suitable for a private or low-traffic pilot only. It is not the preferred long-term production architecture because of disk and resource contention.

### Target 2 — Recommended isolated deployment

Create a new A1 instance in `adminHybridGenai`:

- Use the existing `jobs-vcn` only after verifying its intended ownership, or create a dedicated VCN/subnets.
- Use a public subnet with tightly scoped ingress, or a private subnet with an approved ingress path.
- Install Docker and the Academy stack.
- Use a dedicated PostgreSQL volume.
- Use a dedicated hostname and TLS certificate.
- Keep the existing `hybridgenai` Jobs host untouched.

This provides the cleanest separation, but consumes the second tenancy’s Always Free compute allocation and requires networking setup.

### Target 3 — Oracle-native database migration

Use a dedicated ADB/ATP schema and migrate the Academy database adapter from PostgreSQL to Oracle. This is appropriate only if Oracle Database is a product requirement. It is not necessary for the public-site MVP and should be treated as a separate engineering phase.

## Action plan

### Immediate backup actions — require explicit approval before execution

1. Create a full boot-volume backup for `GenAIInstance`.
2. Create a custom image after reviewing whether the boot volume contains secrets or personal data.
3. Export the custom image to a dedicated Object Storage prefix, preferably an encrypted bucket with lifecycle retention.
4. Export application databases separately and test restoration.
5. Record image ID, backup ID, creation time, and restore instructions in an access-controlled operations record.

### Academy deployment actions — not performed

1. Free at least 10–15 GB on the current host or provision the isolated admin-tenancy instance.
2. Build and test the Academy image locally.
3. Use a versioned image tag and separate `.env` values for OCI.
4. Deploy on an unused internal port.
5. Run health, page, database, and rollback tests.
6. Add Caddy/load-balancer routing only after validation.
7. Configure HTTPS, backups, monitoring, consent/privacy text, rate limiting, and retention before public lead capture.

## Evidence and official references

- [OCI Always Free resources](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm)
- [OCI custom image export](https://docs.oracle.com/en-us/iaas/Content/Compute/Tasks/custom-images-export.htm)
- [OCI custom image import/export across tenancies and regions](https://docs.oracle.com/en-us/iaas/Content/Compute/Tasks/imageimportexport.htm)
- [OCI block volume image export](https://docs.oracle.com/en-us/iaas/Content/Block/Tasks/export.htm)
- [Connecting applications to Autonomous Database](https://docs.oracle.com/en-us/iaas/autonomous-database-serverless/doc/connect-preparing.html)
- [Always Free Autonomous Database limitations](https://docs.oracle.com/en-us/iaas/autonomous-database-serverless/doc/autonomous-always-free.html)

## Limitations of this review

- No OCI resources were created, deleted, resized, stopped, backed up, or reconfigured.
- No custom image or boot-volume backup was created.
- No database schema, table contents, wallet passwords, auth tokens, private keys, or `.env` values were read into the report.
- Object counts were unavailable for some buckets under current permissions.
- Exact billing status, free-tier charge status, ADB schemas, and data ownership require Console/billing review and application-owner confirmation.
- The report recommends a target architecture but does not authorize deployment or migration.
