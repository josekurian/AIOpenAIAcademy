# OCI Always Free optimization, protection, observability, upgrade, and startup partnership plan

**Review date:** November 21, 2026 (America/Chicago)  
**Scope:** Maximize the verified Always Free resources in the `hybridgenai` and `adminHybridGenai` tenancies without deliberately creating paid resources; design a protected Academy operating model; define monitoring, logging, alarms, Functions, Object Storage, and notification usage; and outline an Oracle Cloud upgrade and startup-partnership path.  
**Evidence:** Read-only OCI CLI inventory, local server inspection, local wallet inventory, and current Oracle documentation.  
**No changes performed:** No OCI resource, subscription, policy, alarm, bucket, function, log, database, wallet, or server configuration was created or modified.

## Executive recommendation

The best no-upgrade operating model is a two-tenancy split:

| Tenancy | Use without disrupting existing workloads |
|---|---|
| `hybridgenai` | Keep the existing shared `GenAIInstance` and current production workloads; use it for the present public site only after backups and disk cleanup are approved. |
| `adminHybridGenai` | Reserve the unused Always Free A1 capacity for an isolated Academy host, with its own VCN/subnet rules, Docker volumes, DNS, TLS, and database plan. |

The current `hybridgenai` server is not a good place to maximize additional workloads. It has 2 OCPUs, 12 GB RAM, 6.3 GB free root disk, and many active containers. The cleanest future-free design is therefore:

1. Keep compute workloads isolated by tenancy or dedicated compartment.
2. Use one A1 host for the Academy and reserve E2 Micro only for lightweight monitoring or utility work.
3. Use Object Storage for small, encrypted, lifecycle-managed artifacts—not as an unlimited backup target.
4. Use OCI Monitoring, Logging, Notifications, Events, APM, Audit, and Vault as the control plane.
5. Use OCI Functions for small event-driven automation, not for the Next.js server or database.
6. Treat every existing Autonomous Database and wallet as owned application infrastructure until proven otherwise.

## Verified current estate

### `hybridgenai` tenancy

Verified profiles included `1DEFAULT`, `HGA`, `Default`, and `DEFAULT-HGA123`.

Observed resources:

- One running A1 instance: `GenAIInstance` / `genaiinstance`.
- One active flexible load balancer: `hgai-free-lb`.
- Three active Autonomous resources visible through resource search: `JobsHcsMetricsDB`, `InvoiceVectorDB`, and `HybridAWDB`.
- Five Object Storage buckets: `BlessonBucket`, `HCSBucket`, `HCSFreeLab`, `Invoices`, and `pdfProcess`.
- Three active Monitoring alarms.
- One active Notifications topic with one pending email subscription.
- Three active Logging groups visible through resource search; four active logs were visible in the `Custom` group.
- No OCI Functions application was found.
- No Events rule was found through the inspected list/resource search paths.

### `adminHybridGenai` tenancy

Verified profile: `adminHGA`.

Observed resources:

- No compute instance found.
- No load balancer found.
- One VCN: `jobs-vcn` (`10.20.0.0/16`).
- Two active Autonomous databases: `HcsAgentDB` and `JobsTuneDB`.
- One terminated Autonomous resource: `HybridApex`.
- Five Object Storage buckets: `epm-integ-audit`, `epm-integ-dm-inbox`, `epm-integ-sample-stage`, `hybridgenai-hybridaidp`, and `hybridgenai-hybridaidp-payment`.
- No Monitoring alarms, Notifications topics, Logging groups, OCI Functions applications, or Events rules were found by the inspected paths.

## Always Free capacity and current limits

Oracle’s current Always Free documentation describes free compute, Autonomous Database, Object Storage, Monitoring, Notifications, Logging, APM, Connector Hub, Vault, Bastion, Resource Manager, and related services. Exact limits are tenancy- and region-specific; the following account values were observed through OCI limits queries where available.

| Service | Current observed limit/evidence | Practical use |
|---|---|---|
| A1 Flex | 2 OCPUs and 12 GB memory total in each reviewed tenancy | One properly sized Academy host, or multiple small instances with tradeoffs |
| E2 Micro | Two Always Free Micro allocations were visible in the home AD | Monitoring/proxy/utility workloads; not the full Academy stack |
| Object Storage | 10,000 buckets; 20 GiB total storage in the reviewed `hybridgenai` limit response | Bucket count is plentiful; storage capacity is the real constraint |
| Flexible load balancer | Limit 1 per tenancy; `hybridgenai` already has one active | Keep one public ingress per tenancy; route multiple services behind it |
| Monitoring | 50 alarms per region; 10 alarm CRUD TPS | Use a deliberate alarm budget, not one alarm per container |
| Logging | 100 log groups, 500 logs, 500 logs/group, 10 log rules, 20 log pipelines, 100 saved searches | Centralize logs and keep high-volume sources selective |
| Notifications | 50 topics; 10 subscriptions per topic in the current limits response | Separate critical, warning, and operational destinations |
| Resource Manager | Current CLI response showed one concurrent job; 100 stacks/templates were visible | Use Terraform stacks for repeatable, reviewable infrastructure |
| APM | One free APM domain limit was visible; Oracle documents 1,000 tracing events and 10 synthetic monitor runs/hour | Monitor only key Academy journeys |
| Vault | Oracle documents 150 Always Free secrets and 20 HSM key versions per tenancy | Store database/API/TLS secrets outside images and GitHub |
| Notifications delivery | Oracle documents 1,000 email notifications and 1 million HTTPS notifications/month | Email only critical alerts; use HTTPS/webhooks for automation |
| Monitoring data | Oracle documents 500 million ingestion and 1 billion retrieval data points | Ample for core metrics if high-cardinality custom metrics are avoided |

Oracle’s Always Free documentation is the source of truth for changing limits. The Console’s **Governance & Administration → Limits, Quotas and Usage** view should be checked before each resource creation.

## Maximum Object Storage utilization without wasting the free allowance

### Important distinction

The current tenancy limit permits up to 10,000 buckets, but the storage allowance is 20 GiB total. Creating thousands of empty buckets does not create more storage, backup capacity, or durability. It increases IAM, lifecycle, naming, and audit complexity.

The optimum design is a small number of purpose-specific buckets with prefixes and lifecycle policies:

| Bucket purpose | Recommended contents | Protection policy |
|---|---|---|
| `academy-artifacts` | Build manifests, signed release metadata, deployment manifests | No secrets; short retention for temporary artifacts |
| `academy-backups` | Database dumps, configuration exports, restore manifests | Encryption, restricted write policy, versioning where supported, lifecycle retention |
| `academy-images` | Custom image exports or portable OCI image files | Keep only the latest tested image plus one rollback image |
| `academy-logs` | Compressed long-term critical logs | Export only security/backup evidence; avoid duplicating all searchable logs |
| `academy-static` | Optional static exports, public downloads, social images | Public read only through a controlled endpoint; no write access from browsers |

The existing buckets should not be repurposed until ownership and contents are confirmed. `HCSFreeLab` or `HCSBucket` may be candidates for a reviewed backup prefix, but a dedicated bucket is safer if the Object Storage policies and remaining 20 GiB are acceptable.

### Recommended storage controls

- Use one bucket per data class, not one bucket per object.
- Keep backups under dated prefixes such as `academy/backup/2026/11/21/`.
- Apply lifecycle rules to expire temporary build artifacts and old log exports.
- Encrypt with an OCI-managed key or Vault key where the free limit and operational ownership are understood.
- Disable public access for backup, log, wallet, and database-export buckets.
- Use pre-authenticated requests only for short-lived, read-only transfers, then revoke them.
- Store checksums and restore manifests beside each backup.
- Never place `.env` files, private keys, wallet passwords, or raw lead data in public buckets.
- Monitor bucket size and request metrics; a bucket-count maximum is not a capacity plan.

### Image backup sizing warning

The current `GenAIInstance` boot volume is 47 GB. An exported custom image may exceed the 20 GiB Always Free Object Storage allowance, depending on compression and bucket usage. Use OCI boot-volume backup for the primary recovery copy and Object Storage image export only for a portable, selected image copy.

## Protection architecture using free services

### Identity and access

- Use groups for operators, deployers, read-only auditors, and backup operators.
- Put Academy resources in a dedicated compartment.
- Grant Functions only the minimum access to the specific bucket, log group, or metric namespace it needs.
- Use dynamic groups for compute/Functions identities instead of embedding API keys.
- Use Vault for runtime secrets and rotate database credentials.
- Keep the OCI CLI config and private keys off the server image where possible.
- Separate tenancy administrators from application deployers.
- Require MFA for all human OCI users.

### Network protection

- Keep PostgreSQL, Redis, MinIO, and ADB administrative endpoints private whenever possible.
- Expose only the load balancer/Caddy HTTPS endpoint and SSH through a controlled route.
- Prefer OCI Bastion for administrative SSH to private resources; Bastion is documented as free.
- Use security lists or NSGs with explicit source CIDRs and only required ports.
- Enable VCN flow logs selectively for the Academy VCN or sensitive subnets; free-tier Logging capacity is limited, so avoid unbounded flow-log volume.
- Do not expose database ports to the internet.

### Backup protection

- Keep at least one current OCI boot-volume backup.
- Keep one tested custom image export for cross-tenancy or cross-region recovery.
- Keep application-level database backups separately from the VM image.
- Test restore into a disposable compartment/instance.
- Store backup metadata, checksums, and restore commands in the protected backup bucket.
- Track the five-backup Always Free volume-backup cap documented by Oracle; do not assume unlimited boot-volume backups.

## Observability design

Oracle describes Monitoring, Logging, Events, Notifications, APM, and Connector Hub as interoperable observability services. The recommended flow is:

```text
OCI metrics ───────────────┐
Audit/service/custom logs ─┼─> Monitoring alarms ─> Notifications topic ─> email/HTTPS
OCI Events ────────────────┘                │
                                           └─> OCI Function for bounded automation
```

### Monitoring alarms: use a deliberate alarm budget

The tenancy limit observed is 50 alarms per region. A useful Academy baseline is 12–18 alarms, leaving room for future services:

1. Compute CPU high: `CpuUtilization[5m].mean() > 80`.
2. Compute CPU sustained: high CPU for 15 minutes.
3. Load balancer backend unhealthy.
4. Load balancer 5xx/error rate.
5. Academy HTTP synthetic check failure.
6. Academy API health failure.
7. Database availability for the dedicated Academy database.
8. Database CPU or ECPU saturation.
9. Database storage threshold.
10. Object Storage request errors or unexpected growth.
11. Functions error count or invocation failure.
12. Notifications delivery failure.
13. Boot-volume storage threshold, if a custom metric/agent is available.
14. Backup completion or backup-age check.
15. Certificate/TLS expiry reminder, if implemented through an external scheduled check.

Avoid alarms on every container. Container-level health should be aggregated into one application health signal or handled by Docker/Compose health checks locally.

### Logging plan

Current `hybridgenai` logging already has three visible groups and four visible logs in `Custom`, including HCSBucket read/write access logs and custom `access`/`predict` logs. `adminHybridGenai` showed no log groups through the inspected path.

Create a small logical structure:

- `academy-security-logs`: Audit, IAM, VCN flow logs, load balancer security events.
- `academy-runtime-logs`: Caddy, Next.js/API, Functions, and selected service logs.
- `academy-data-logs`: ADB audit and Object Storage access events where justified.

Use Logging Search and saved searches for:

- Authentication failures.
- Unexpected IAM policy/resource changes.
- Load balancer 4xx/5xx spikes.
- Academy API exceptions.
- Database availability/connection failures.
- Object Storage delete/write activity.
- Function failures and retry storms.

Keep high-volume access logs at short retention and export only security, backup, and incident evidence. Logging is not a reason to enable every possible bucket read event.

### Notifications

The current `hybridgenai` topic has one pending email subscription. Confirm that subscription before relying on it; a pending subscription will not behave like a confirmed destination.

Recommended topics:

- `academy-critical`: confirmed email plus optional HTTPS webhook.
- `academy-warning`: HTTPS/webhook or a lower-noise email route.
- `academy-operations`: deployment/backup notices, preferably HTTPS or a controlled mailbox.

Use email only for actionable critical events. Use the one-million HTTPS notification allowance for automation and the 1,000-email allowance for human escalation.

### APM and synthetic monitoring

Oracle documents 1,000 APM tracing events and 10 synthetic monitor runs per hour as Always Free resources. A practical schedule is two synthetic checks every 15 minutes, producing eight runs/hour:

- Public homepage.
- `/api/health` or an equivalent non-mutating health endpoint.

Do not include lead-submission writes in synthetic monitors. Use synthetic checks only for availability and safe read-only behavior.

## OCI Functions utilization plan

No OCI Functions applications were found in either tenancy. Functions should be used for small, bounded automation rather than replacing the Academy web server.

Recommended first Functions:

### 1. Backup verification function

- Trigger: scheduled invocation.
- Read: backup manifest and expected object metadata.
- Action: publish success/failure to Notifications.
- Constraint: never delete backups automatically.

### 2. Object Storage hygiene function

- Trigger: schedule or Object Storage event.
- Action: identify temporary artifacts older than the approved retention period.
- Default behavior: report candidates only; require an explicit approval path before deletion.

### 3. Health summary function

- Trigger: scheduled invocation.
- Read: selected Monitoring metrics and health endpoints.
- Action: create a compact daily status summary in a protected bucket or send a low-volume HTTPS notification.

### 4. Incident evidence function

- Trigger: critical alarm or event.
- Action: capture alarm metadata, relevant log-search links, and resource identifiers into an incident prefix.
- Constraint: do not copy secrets, request bodies, lead content, or private keys.

Use a single regional Functions application with multiple small code-only functions where possible. Oracle recommends grouping related functions in an application for efficiency. Code-only functions avoid unnecessary container-image storage, though image-based functions may be appropriate for dependencies that cannot be packaged cleanly.

Required prerequisites include a suitable subnet, IAM policies, and logging configuration. Image-based Functions also require an image registry and architecture-compatible image; this matters because the existing compute host is ARM-based.

## Events and automation rules

No Events rules were found. A useful free-tier event set would be:

- Object Storage object created in `academy-backups` → backup verification Function.
- Object Storage object deleted in protected buckets → critical notification.
- Compute instance state change → operations notification.
- ADB availability/state change → critical notification.
- Load balancer backend state change → critical notification.
- Alarm state change → Notifications topic.
- Secret/version lifecycle change → security notification.

The CLI returned an Events `rule-count` value of zero in the inspected limit query, so the current console should be checked before designing around a specific event-rule quota.

## Upgrade path without losing Always Free resources

Oracle states that a Free Tier account can be upgraded to Pay As You Go, and Always Free resources remain available after upgrading; charges apply to resources above Always Free amounts. The upgrade should be treated as a financial control change, not a routine technical action.

### Stage 0 — Free-only hardening

- Create backups and test restore.
- Move Academy into an isolated compartment/host.
- Configure Monitoring, Logging, Notifications, Vault, Bastion, and lifecycle rules.
- Add DNS, TLS, rate limiting, consent/privacy controls, and incident ownership.

### Stage 1 — Pay As You Go guardrails

Upgrade only after:

- A budget and alert are configured.
- Compartment quotas are defined.
- Resource tags identify owner, environment, cost center, and data class.
- A monthly cost ceiling is approved.
- A rollback plan exists for paid resources.

Use PAYG to add one resource at a time: larger compute, more block volume, a second ingress path, or additional database capacity. Keep Always Free resources for non-production, recovery, or low-traffic workloads.

### Stage 2 — Production reliability

Potential paid additions:

- Larger or multiple compute nodes.
- Separate staging and production instances.
- A second load-balancing/ingress pattern.
- WAF and stronger edge controls.
- OCI DevOps build/deploy pipelines.
- Logging Analytics and longer retention.
- ADB scaling, private endpoints, backups, and higher session capacity.
- OKE only when service decomposition genuinely requires Kubernetes.

### Stage 3 — Enterprise readiness

- Multi-availability-domain or multi-region recovery.
- Dedicated compartments and separate tenancies where contractual isolation requires it.
- Private connectivity, VPN/FastConnect, and centralized IAM federation.
- Formal RTO/RPO, incident response, penetration testing, and disaster-recovery exercises.
- Oracle support entitlement and a named technical account relationship.

## Oracle Cloud startup and partnership opportunities

### Oracle for Startups

Oracle’s startup pages describe access to OCI, startup support, reference architectures, developer resources, and startup ecosystem programs. Older Oracle startup collateral advertises cloud credits and discounts, but eligibility, amounts, duration, and benefits must be confirmed directly through the current program application. Do not treat historical brochure values as guaranteed benefits.

Potential benefits to pursue:

- Cloud credits or discounted OCI consumption.
- Technical migration and architecture support.
- Access to Oracle product teams and developer programs.
- Startup reference architectures and solution validation.
- Marketing, events, and ecosystem exposure for qualifying startups.
- Potential customer introductions or co-selling through qualified programs.

### Partner and marketplace path

For Hybrid Cloud Services LLC / HybridGenAI Academy, a credible progression is:

1. Define the product: public Academy site, guided training, and clearly separated independent education services.
2. Build a reference architecture using OCI Always Free services.
3. Publish security, privacy, backup, and operational controls.
4. Demonstrate a working deployment and measurable customer outcomes.
5. Apply to Oracle for Startups and discuss the current eligibility requirements.
6. Explore Oracle PartnerNetwork or marketplace participation only after the product, legal entity, support model, and customer references are ready.
7. Request co-selling or marketplace support only for services that have real operational behavior and documented ownership.

Do not claim Oracle endorsement, partnership, certification, or co-selling access until a current written approval or agreement exists.

## 90-day execution roadmap

### Days 1–7: protect and measure

- Create and verify a boot-volume backup for `GenAIInstance`.
- Record current container images, Compose files, volumes, Caddy configuration, and DNS.
- Confirm the existing Notifications email subscription.
- Create the minimum Academy alarm set.
- Create one dedicated backup bucket or prefix after checking current storage use.
- Confirm current OCI budgets and billing state.

### Days 8–30: isolate the Academy

- Prepare an isolated A1 target in `adminHybridGenai`, or reserve the existing server for a controlled pilot.
- Deploy the Academy on an internal port with a separate PostgreSQL volume.
- Add health checks, logs, backup verification, and rollback documentation.
- Configure a dedicated hostname and TLS path.

### Days 31–60: add automation

- Deploy the backup verification Function.
- Add Object Storage, ADB, load balancer, and compute event rules.
- Add APM synthetic checks within the 10-runs/hour allowance.
- Add saved searches for security and runtime incidents.

### Days 61–90: prepare for growth

- Test restore from boot-volume backup and application database backup.
- Review disk, CPU, memory, logs, and notification volumes.
- Prepare a PAYG budgeted upgrade plan only if free capacity is insufficient.
- Prepare Oracle for Startups materials: product brief, architecture, security summary, customer evidence, and support model.

## Guardrails

- “Always Free” does not mean unlimited; quota, capacity, storage, request, notification, and retention limits still apply.
- Creating the maximum number of buckets or alarms is not optimal protection. Use a small, explainable inventory.
- Never use a shared production database for the Academy without schema ownership and restore testing.
- Never commit OCI config files, API keys, wallet files, wallet passwords, database dumps, or private lead data to GitHub.
- Never enable broad public access to backup, logs, wallets, or database exports.
- Do not automate destructive deletion until a tested restore path and human approval process exist.
- Do not use high-cardinality custom metrics or verbose object-read logging indiscriminately; they consume observability allowances without improving decisions.
- Treat all “current” limits as observed evidence, not a permanent guarantee; recheck the OCI Console before provisioning.

## References

- [Oracle OCI Always Free resources](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm)
- [OCI service limits](https://docs.oracle.com/en-us/iaas/Content/General/service-limits/default.htm)
- [OCI Logging overview](https://docs.oracle.com/en-us/iaas/Content/Logging/Concepts/loggingoverview.htm)
- [OCI monitoring and observability](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/monitoring-and-observability.htm)
- [OCI Object Storage metrics](https://docs.oracle.com/en-us/iaas/Content/Object/Reference/objectstoragemetrics.htm)
- [OCI Events and Notifications strategy](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/events-notifications-strategy.htm)
- [OCI Functions concepts](https://docs.oracle.com/en-us/iaas/Content/Functions/Concepts/functionsconcepts.htm)
- [OCI Functions limits](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionsviewinglimits.htm)
- [OCI APM and Always Free limits](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm)
- [Oracle Cloud Free Tier](https://www.oracle.com/cloud/free/)
- [Oracle Cloud Free Tier FAQ](https://www.oracle.com/cloud/free/faq/)
- [Oracle Cloud Infrastructure for Startups](https://www.oracle.com/cloud/oracle-for-startups/)
- [OCI account upgrade and Pay As You Go](https://docs.oracle.com/en-us/iaas/Content/Billing/Tasks/changingpaymentmethod.htm)

## Review limitations

- No resource changes were performed.
- The report does not contain OCI OCIDs, private keys, auth tokens, wallet passwords, or database contents.
- Some Object Storage object counts and service limit names were unavailable through the current CLI permissions or command surface; the OCI Console should be used to confirm final usage before provisioning.
- Historical startup-program collateral can contain outdated dollar amounts or discount terms. Eligibility and benefits must be confirmed through Oracle’s current startup application.
