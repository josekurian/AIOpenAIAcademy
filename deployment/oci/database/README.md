# Academy AI Database expansion

The existing `AIDB` Autonomous Database in the `hybridgenai123` tenancy is the intended free-tier target. The plan creates an isolated Academy schema in that database; it does not create a second Autonomous Database or silently consume another free quota allocation.

## Safe activation order

1. Confirm the database is `AVAILABLE`, mTLS wallet access works, and a backup/restore owner is assigned.
2. Create the schema outside the repository using a password supplied interactively by an administrator. Never commit the password or wallet.
3. Run `001_academy_ai_schema.sql` with SQLcl.
4. Load reviewed official-resource metadata and independent practice content. Do not copy restricted provider content into the database.
5. Generate embeddings only with an approved model and record the model/version. The vector index is intentionally deferred until a corpus exists.
6. Run `002_academy_ords.sql` and expose only read-only endpoints behind HTTPS/authentication or a private network boundary.
7. Connect an MCP host to a small read-only adapter that calls the ORDS boundary. Do not grant MCP write access to learner, lead, IAM, or credential tables.

## SQLcl bootstrap pattern

```bash
sql /nolog
SQL> connect ADMIN@AIDB_LOW
SQL> CREATE USER AIOPENAIAACADEMY IDENTIFIED BY "<interactive-secret>";
SQL> GRANT CREATE SESSION, CREATE TABLE, CREATE VIEW, CREATE SEQUENCE, CREATE PROCEDURE TO AIOPENAIAACADEMY;
SQL> ALTER USER AIOPENAIAACADEMY QUOTA 2G ON DATA;
SQL> connect AIOPENAIAACADEMY@AIDB_LOW
SQL> @deployment/oci/database/001_academy_ai_schema.sql
SQL> @deployment/oci/database/002_academy_ords.sql
```

The exact grants depend on the tenancy’s Autonomous Database policy. If `CREATE USER` or the vector index is denied, stop and record the error; do not broaden privileges automatically.

## MCP boundary

An MCP integration should expose only `academy_search`, `academy_list_practice_tests`, and `academy_get_practice_test` as read-only tools. It must validate input length, enforce source visibility, time out ORDS calls, redact errors, and never accept arbitrary SQL. The Next.js site remains the public UI; ORDS/MCP are optional integration surfaces, not proof of an official OpenAI integration.
