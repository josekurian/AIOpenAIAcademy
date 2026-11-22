#!/usr/bin/env python3
"""Read-only daily Oracle Autonomous Database keepalive.

Runs SELECT 1 FROM dual against known local wallet aliases. Credentials and
wallet contents are read locally and are never written to the result log.
"""
from __future__ import annotations

import json
import os
import socket
import subprocess
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import oracledb

ROOT = Path(__file__).resolve().parents[2]
LOG = Path(os.environ.get("OCI_DB_KEEPALIVE_LOG", str(Path.home() / ".local/state/hybridgenai/oci-db-keepalive.jsonl")))
TIMEOUT = float(os.environ.get("OCI_DB_KEEPALIVE_TIMEOUT", "10"))

DATABASES = [
    {"tenancy": "hybridgenai123", "name": "AIDB", "dsn": "aidb_low", "wallet": "/Users/josekurian/.oci/wallets/AIDB", "password": "/Users/josekurian/.oci/apex_adb_passwords/AIDB_ADMIN.txt"},
    {"tenancy": "hybridgenai123", "name": "ATPDB", "dsn": "atpdb_low", "wallet": "/Users/josekurian/HybridGenAI/1AAAProduction/CurrentProjects/ATP/Wallet_ATPDB", "password": "/Users/josekurian/.oci/apex_adb_passwords/ATPDB_ADMIN.txt"},
    {"tenancy": "hybridgenai123", "name": "AWSDB", "dsn": "awsdb_low", "wallet": "/Users/josekurian/HybridGenAI/OracleCloud/Hybridgenai123/wallet", "password": "/Users/josekurian/.oci/apex_adb_passwords/ATPDB_ADMIN.txt"},
    {"tenancy": "hybridgenai", "name": "JobsHcsMetricsDB", "dsn": "jobshcsmt_low", "wallet": "/Users/josekurian/.oci/wallets/JobsHcsMetricsDB", "password": "/Users/josekurian/.oci/apex_adb_passwords/JobsHcsMetricsDB_ADMIN.txt"},
    {"tenancy": "hybridgenai", "name": "InvoiceVectorDB", "dsn": "invvecdba20260401_low", "wallet": "/Users/josekurian/.oci/invoice_vector_db_wallet", "password": "/Users/josekurian/.oci/apex_adb_passwords/InvoiceVectorDB_ADMIN.txt"},
    {"tenancy": "hybridgenai", "name": "HybridAWDB", "dsn": "awdb_low", "wallet": "/Users/josekurian/HybridGenAI/OracleCloud/HCS_ADW/HCSWallet_AWDB copy", "password": "/Users/josekurian/.oci/apex_adb_passwords/CURRENT.txt"},
    {"tenancy": "adminHybridGenai", "name": "HcsAgentDB", "dsn": "hcsagent_low", "wallet": "/Users/josekurian/.oci/wallets/HcsAgentDB", "password": "/Users/josekurian/.oci/apex_adb_passwords/HcsAgentDB_ADMIN.txt"},
    {"tenancy": "adminHybridGenai", "name": "JobsTuneDB", "dsn": "jobstune_low", "wallet": "/Users/josekurian/.oci/wallets/JobsTuneDB", "password": "/Users/josekurian/.oci/apex_adb_passwords/JobsTuneDB_ADMIN.txt"},
]


def password_from(path: str) -> str:
    lines = [line.strip() for line in Path(path).read_text().splitlines() if line.strip() and not line.lstrip().startswith("#")]
    if not lines:
        raise ValueError("no password value")
    return lines[-1]


def ping(item: dict[str, str]) -> dict[str, str | int | float]:
    started = time.monotonic()
    result: dict[str, str | int | float] = {"tenancy": item["tenancy"], "database": item["name"], "dsn": item["dsn"]}
    try:
        wallet = Path(item["wallet"])
        password_file = Path(item["password"])
        if not wallet.is_dir():
            raise FileNotFoundError(f"wallet directory unavailable: {wallet}")
        password = password_from(str(password_file))
        # Thin mode uses the local wallet configuration and avoids requiring a
        # machine-wide Oracle client installation.
        with oracledb.connect(
            user="ADMIN",
            password=password,
            dsn=item["dsn"],
            config_dir=str(wallet),
            wallet_location=str(wallet),
            tcp_connect_timeout=TIMEOUT,
            retry_count=0,
        ) as connection:
            with connection.cursor() as cursor:
                cursor.execute("select 1 from dual")
                value = cursor.fetchone()[0]
                if value != 1:
                    raise RuntimeError("unexpected keepalive result")
        result["status"] = "ok"
    except Exception as exc:  # sanitized: no credential, wallet, or SQL text
        result["status"] = "failed"
        result["error_type"] = type(exc).__name__
        # Keep wallet paths, connection strings, and driver diagnostics out of
        # the persistent log. The error class is enough for scheduled triage.
        result["error"] = "connection attempt failed"
    result["duration_seconds"] = round(time.monotonic() - started, 3)
    return result


def worker(index: int) -> int:
    result = ping(DATABASES[index])
    print(json.dumps(result, sort_keys=True), flush=True)
    return 0 if result["status"] == "ok" else 2


def main() -> int:
    if len(sys.argv) == 3 and sys.argv[1] == "--worker":
        return worker(int(sys.argv[2]))

    LOG.parent.mkdir(parents=True, exist_ok=True)
    results = []
    for index, item in enumerate(DATABASES):
        try:
            completed = subprocess.run(
                [sys.executable, str(Path(__file__).resolve()), "--worker", str(index)],
                stdin=subprocess.DEVNULL,
                capture_output=True,
                text=True,
                timeout=TIMEOUT + 2,
                check=False,
            )
            lines = [line for line in completed.stdout.splitlines() if line.strip().startswith("{")]
            if lines:
                results.append(json.loads(lines[-1]))
            else:
                results.append({"tenancy": item["tenancy"], "database": item["name"], "dsn": item["dsn"], "status": "failed", "error_type": "NoWorkerResult", "error": "connection attempt timed out or produced no result", "duration_seconds": TIMEOUT + 2})
        except subprocess.TimeoutExpired:
            results.append({"tenancy": item["tenancy"], "database": item["name"], "dsn": item["dsn"], "status": "failed", "error_type": "TimeoutExpired", "error": "connection attempt timed out", "duration_seconds": TIMEOUT + 2})
    record = {"timestamp": datetime.now(timezone.utc).isoformat(), "host": socket.gethostname(), "results": results}
    with LOG.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(record, sort_keys=True) + "\n")
    print(json.dumps(record, indent=2))
    return 0 if all(item["status"] == "ok" for item in record["results"]) else 2


if __name__ == "__main__":
    sys.exit(main())
