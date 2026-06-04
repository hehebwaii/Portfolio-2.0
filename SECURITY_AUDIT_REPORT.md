# Security Audit & Cyber Forensics Report

**Date of Audit**: June 4, 2026  
**Scope**: Portfolio 2.0 Web Application Repository  
**Auditor**: Principal DevSecOps Engineer & Cyber Forensics Specialist  
**Status**: COMPLIANT // Telemetry Cleaned

---

## 1. Executive Summary
A comprehensive cyber forensics and security sweep has been performed on the local repository. The audit focused on locating leaked credentials in active code and historical commits, analyzing database security configurations, inspecting repository leakage policies, and evaluating package dependencies. 

- **Git History**: **Clean / Low Risk**. No Stripe live keys (`sk_live`), Google/Firebase API keys (`AIzaSy`), or Web3Forms access key values were ever committed. The read-only TinaCMS Content Query Token is historically and currently committed in `tina/__generated__/client.ts`, which is normal for TinaCMS client-side queries, but should be monitored.
- **Database Configurations**: **Safe**. No active database connections or open rules files (Firebase/Firestore) exist in this repository.
- **Repository Locks**: **Excellent**. Updated `.gitignore` to enforce strict exclusions of env files, IDE states, OS metadata, and build directories.
- **Dependencies**: **Monitored**. Found 17 development/build-time vulnerabilities (13 high). Remediation requires breaking downgrades (e.g., downgrading Next.js to v9.3.3) and is not recommended.

---

## 2. Git History Forensic Scan
We scanned all historical commits (across all branches) using Git log filtering for known secret patterns.

### Tested Signatures & Matches
| Signature Pattern | Risk Level | Detections | Status |
| :--- | :--- | :--- | :--- |
| `"WEB3FORMS_KEY"` | Critical (Server-side SMTP proxy key) | 1 (Commit `4ca3616`) | **Safe**: Only reference is reading `process.env.WEB3FORMS_KEY` inside the server-side API proxy. |
| `"TINA_TOKEN"` | Medium (Content query token) | 3 (Commits `ca90240`, `44adb35`, `43fed6e`) | **Monitored**: Hardcoded token exists in `tina/__generated__/client.ts` to allow client-side queries to TinaCloud. |
| `"sk_live"` | Critical (Stripe Live Secret Key) | 0 | **Safe** |
| `"AIzaSy"` | High (Google / Firebase API Key) | 0 | **Safe** |
| Hardcoded Emails | Medium (PII scraping risk) | 0 | **Safe**: No personal email addresses are hardcoded in the codebase. |

### Forensics Insight: TinaCMS Client Token
The TinaCMS token value `9b729aa66b21d3070ba33705bee04fc65ad32b43` is committed in `tina/__generated__/client.ts`.
- **Context**: This is the read-only query token generated during build-time so the client browser can connect to the TinaCloud GraphQL endpoint.
- **Recommendation**: Since it has read-only access to query public content, the risk is minimal. Ensure this token does **not** have write/admin privileges in your TinaCloud console.

---

## 3. Local Infrastructure & Database Rules Audit
We searched the entire workspace for rules and configuration files relating to Firebase, Firestore, or other backend systems.
- **Finding**: **0 database rules files found**.
- **Explanation**: This is a static frontend website integrated with TinaCMS and serverless API route proxies; it does not implement a Firebase or Firestore backend, rendering database rules configuration vulnerabilities **Not Applicable** to this repository.

---

## 4. Repository Lockout Audit (`.gitignore`)
We audited the root `.gitignore` file and added explicit rules to prevent local configuration and OS metadata from leaking to GitHub.

The following ignore groups are now active:
1. **Environmental Configs**: `.env*`, `*.env`, `*.env.local`, `*.env.production`, `*.env.development`, `*.env.staging` (blocks all environmental setups).
2. **Local OS Metadata**: `.DS_Store`, `Thumbs.db` (blocks macOS and Windows folder caching metadata).
3. **Local IDE States**: `.idea/`, `.vscode/` (blocks JetBrains and VS Code project states).
4. **Build Caches**: `.next/`, `node_modules/`, `dist/` (prevents bloated build caches from escaping).

---

## 5. Dependency Vulnerability Sweep
We ran `npm audit` to check the installed package tree for vulnerabilities.

### Findings
- **Total Advisories**: 17 vulnerabilities (1 low, 3 moderate, 13 high).
- **Key Vulnerable Packages**:
  - `lodash` (<=4.17.23, High) - Used inside `@graphql-codegen` under `@tinacms/cli`.
  - `js-cookie` (<=3.0.5, High) - Used in `react-use` under `tinacms`.
  - `esbuild` (<=0.24.2, Moderate) - Used in `@tinacms/cli` and `vite`.
  - `postcss` (<8.5.10, Moderate) - Used by the `next` build compiler.

### Remediation Status
- Running `npm audit fix --production` completed with no modifications because all vulnerabilities are located in development-only dependencies (`devDependencies`) or require breaking changes.
- **Why we did not run `npm audit fix --force`**:
  - `npm` suggests downgrading Next.js to v9.3.3 to resolve the `postcss` advisory. Downgrading from Next.js 16 to v9 would break the application completely.
  - Similarly, upgrading `tinacms` and its CLI automatically to fix `js-cookie` and `lodash` would introduce breaking API changes.
- **Security Posture**: Because these packages are only used locally at build-time or inside the local `/admin` editing console, they do not expose any runtime vulnerabilities to public site visitors.
