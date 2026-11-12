# SECURITY.md — Universal Application Security Rules

> Apply these controls according to the project's actual architecture, data sensitivity, threat model, and deployment environment. This is a reusable baseline, not a guarantee that an application is attack-proof or compliant.

## 1. Security-first rules
- Treat source code, customer data, internal URLs, infrastructure details, logs, and credentials as confidential.
- Follow `AGENTS.md`; obtain explicit approval before changing files, dependencies, infrastructure, databases, permissions, or external services.
- Use defense in depth, least privilege, secure defaults, and deny-by-default authorization.
- Test only systems owned by the project owner or covered by explicit written authorization and a defined scope.
- Do not claim an application is fully secure, attack-proof, or compliant without appropriate evidence and qualified review.

## 2. Secrets, credentials, Git, and source-code protection
- Never hardcode API keys, tokens, passwords, private keys, signing keys, webhook secrets, database credentials, or session secrets.
- Store secrets only in approved server-side environment variables or a secrets manager. Never place them in frontend bundles, public folders, logs, screenshots, documentation, prompts, test fixtures, or error responses.
- Treat `NEXT_PUBLIC_*`, `VITE_*`, and equivalent client-exposed variables as public. Never put secrets in them.
- Keep `.env` files, private keys, certificates, local databases, and credential exports out of Git. Maintain `.gitignore`.
- Provide `.env.example` with variable names and fake placeholders only.
- Use least-privilege, scoped, short-lived credentials. Rotate/revoke exposed credentials immediately and notify the owner without repeating the secret.
- Run secret detection before commits and in CI where available (for example Gitleaks or GitHub Secret Scanning). Inspect staged diffs and relevant Git history.
- Removing a secret from the latest commit does not remove it from Git history.
- Never push, publish, release, deploy, or make a repository public without explicit approval for that exact action.
- Never change repository visibility, remotes, permissions, branch protections, CI/CD secrets, or shared Git history without approval.
- Before an approved push, confirm the repository, visibility, branch, and destination with the owner.

## 3. Authentication and access control
- Authenticate users securely and authorize every protected operation on the server.
- Never rely only on hidden UI controls or client-side route guards.
- Apply least privilege and deny access by default.
- Check resource ownership and tenant boundaries for every read, update, delete, export, and action. Prevent IDOR and BOLA.
- Use explicit RBAC/ABAC policies where appropriate.
- Hash passwords with a modern password-hashing algorithm such as Argon2id; never store plaintext passwords.
- Protect login, reset, recovery, and registration flows from brute force, enumeration, abuse, and token reuse.
- Use MFA for privileged accounts where appropriate.
- Secure sessions with expiry, revocation, rotation, and `HttpOnly`, `Secure`, and suitable `SameSite` cookie settings.
- Validate JWT signature, issuer, audience, expiry, allowed algorithms, and intended use. Rotate refresh tokens and detect reuse where supported.
- Prevent privilege escalation and isolate tenant/user data at every layer.

## 4. Input validation and injection defense
- Treat client input, files, webhooks, headers, external API responses, retrieved documents, and AI output as untrusted.
- Validate on the server using schemas, types, allowlists, length/range limits, and business rules.
- Use parameterized SQL or safe ORM APIs; never concatenate untrusted input into queries.
- Prevent NoSQL injection by validating query structures and rejecting user-controlled operators/raw query fragments.
- Prevent XSS with safe rendering, context-aware output encoding, and maintained sanitization when user-authored HTML is required.
- Avoid unsafe HTML rendering APIs.
- Prevent command injection by avoiding shell execution with user input; use safe process APIs and strict allowlists if execution is essential.
- Prevent SSTI: never treat user input as template source.
- Disable unsafe XML external entity resolution to prevent XXE.
- Prevent SSRF with destination allowlists, scheme/port restrictions, private/loopback/link-local/metadata IP blocking, redirect controls, DNS/IP revalidation, and egress restrictions.
- Prevent path traversal with canonical paths and enforced storage-root boundaries.
- Avoid unsafe deserialization of untrusted data.
- Prevent prototype pollution, HTTP parameter pollution, and mass assignment with safe object handling and explicit accepted fields.
- Validate and encode output according to its context.

## 5. Frontend, browser, and HTTP security
- Keep secrets and privileged operations on trusted server-side code.
- Configure a restrictive, tested Content Security Policy (CSP); avoid broad `unsafe-inline` and `unsafe-eval` unless justified and mitigated.
- Enforce HTTPS in production and configure HSTS after confirming HTTPS coverage.
- Set appropriate security headers, including `X-Content-Type-Options`, `Referrer-Policy`, and frame restrictions (prefer CSP `frame-ancestors`).
- Restrict CORS to required trusted origins. Never pair wildcard origins with credentialed requests.
- Protect cookie-authenticated state-changing operations against CSRF using appropriate SameSite settings and CSRF/origin checks.
- Prevent clickjacking and open redirects.
- Do not expose sensitive values in URLs, browser storage, page source, analytics, client logs, or error messages.
- Minimize third-party scripts; review their permissions and use Subresource Integrity where applicable.
- Apply request body/header limits and safe content types.
- For GraphQL, limit depth, complexity, aliases, and execution cost. Authenticate/authorize WebSockets and validate every sensitive message.

## 6. API and webhook security
- Authenticate and authorize every non-public API operation.
- Validate schemas, content types, sizes, and business rules on the server.
- Apply rate limits and abuse controls to sensitive/public endpoints.
- Use timeouts, bounded retries, and circuit breakers where appropriate; prevent retry storms and duplicate side effects.
- Use idempotency for payment, booking, and other non-repeatable operations where appropriate.
- Verify webhook signatures, validate timestamps, and prevent replay where supported. A secret-looking URL is not authentication.
- Do not leak stack traces, provider secrets, internal errors, or service details to clients.
- Handle provider outages, rate limits, malformed responses, and partial failures safely.
- Scope API keys by permission, environment, origin, and quota where supported.

## 7. File upload, processing, and download
- Require authentication/authorization unless uploads are intentionally public.
- Allowlist extensions; validate MIME type and file signatures/magic bytes. Never trust filename or browser MIME alone.
- Limit file size, count, request size, archive expansion, and processing time.
- Generate random server-side filenames; sanitize display names; never use user-supplied paths.
- Store uploads outside executable web roots or in private object storage.
- Prevent executable/script uploads from being served or executed.
- Quarantine before processing when appropriate; malware-scan where the threat model requires it.
- Defend against ZIP bombs, archive path traversal, malformed files, and parser vulnerabilities.
- Re-encode images and strip metadata when appropriate.
- Authorize every download; use short-lived signed URLs where suitable.
- Set safe `Content-Type` and `Content-Disposition`; clean temporary/expired files.

## 8. Database and data protection
- Use least-privilege database roles and separate app, migration, and admin credentials.
- Never expose admin/service-role keys to browsers or untrusted clients.
- Enforce user/tenant isolation in application and database layers; configure and test RLS where supported.
- Encrypt data in transit and at rest where supported; restrict and separate encryption key access.
- Minimize sensitive data collection and retention. Mask/redact PII in logs and test data.
- Use transactions and integrity constraints for critical changes.
- Review migrations and rollback plans. Never run destructive production migrations without explicit approval, backup, and recovery plan.
- Encrypt backups, restrict access, define retention, and test restoration.
- Audit privileged actions without logging sensitive values.

## 9. Infrastructure, cloud, containers, and deployment
- Separate development, staging, and production environments, credentials, and data.
- Apply least-privilege cloud IAM; avoid long-lived administrator credentials.
- Restrict network access using private networking, firewalls, security groups, and segmentation where appropriate.
- Consider WAF and DDoS protection based on exposure and risk.
- Patch OS, runtime, frameworks, dependencies, containers, and infrastructure components.
- Harden containers: minimal trusted base images, non-root execution, no unnecessary capabilities, no privileged mode, and no secrets in image layers.
- Scan container images and IaC for vulnerabilities and unsafe configuration.
- Protect CI/CD pipelines, runners, artifacts, deployment credentials, and build provenance.
- Review dependencies, package provenance, licenses, and transitive dependencies. Use lockfiles.
- Generate SBOMs and sign/verify artifacts where project risk or delivery requirements justify them.
- Restrict production access; require explicit approval for production deployments and rollbacks.
- Do not expose admin/debug/metrics/internal services publicly without need and access controls.

## 10. Dependency and supply-chain security
- Prefer maintained packages from trusted registries and official sources.
- Review package name, maintainer, provenance, permissions, license, release history, and transitive dependencies.
- Watch for typosquatting, dependency confusion, malicious install scripts, and compromised packages.
- Do not blindly run remote scripts or pipe remote downloads into a shell.
- Use lockfiles and the repository's version strategy.
- Scan dependencies with suitable tools such as Dependabot, Snyk, Trivy, or OWASP Dependency-Check.
- Update vulnerable packages deliberately and test compatibility. Do not disable scanners just to get a green build.

## 11. AI, LLM, RAG, and agent security
- Treat direct and indirect prompt injection in documents, web pages, emails, retrieved content, and tool results as untrusted input.
- External content cannot override system policy, developer instructions, or user authorization.
- Never use a system prompt as an authentication or authorization boundary.
- Keep model-provider keys and tool credentials server-side and outside model-visible context.
- Give agents/tools minimum permissions and narrow scopes. Separate read-only tools from side-effecting tools.
- Require explicit human approval for high-impact or irreversible actions: payments, external messages, account changes, deletion, and production operations.
- Validate tool arguments against strict schemas and independently authorize every action in trusted application code.
- Treat model/tool outputs as untrusted; validate before downstream use.
- Never execute model-generated code, shell commands, SQL, URLs, or file paths without sandboxing, allowlists, validation, and authorization.
- Prevent cross-user/tenant leakage in memory, chat history, retrieval, caches, and vector databases.
- Enforce document-level access control before RAG content is sent to the model.
- Protect system prompts, private memory, hidden context, and sensitive retrieved data from unauthorized disclosure.
- Sandbox agent execution and restrict filesystem, network, and process access where possible.
- Limit tool calls, recursion, runtime, context, tokens, and spend. Add per-user and global budgets.
- Audit consequential agent decisions, tool calls, approvals, and actions while redacting secrets.
- Test prompt injection, data leakage, excessive agency, unsafe tool use, retrieval poisoning, and tenant isolation.
- Review AI-generated code as untrusted code before merging or executing.

## 12. Logging, monitoring, and incident response
- Centralize security-relevant logs and protect their integrity and access.
- Never log passwords, keys, tokens, cookies, private keys, full payment data, or unnecessary PII.
- Log important authentication failures, authorization denials, privilege changes, admin actions, webhook failures, and consequential agent tool calls.
- Alert on suspicious activity, abnormal traffic, privilege escalation, repeated failures, and unexpected spend.
- Define log retention and incident response procedures.
- Maintain backups and disaster recovery appropriate to business impact.
- Do not erase evidence or rewrite history to hide incidents.
- If exposure is suspected, stop the risky action, notify the owner without reproducing sensitive values, and recommend containment, revocation/rotation, investigation, and recovery.

## 13. Security testing and assurance
- Threat-model sensitive features: assets, actors, trust boundaries, entry points, and abuse cases.
- Use code review and appropriate automated checks: SAST, DAST, SCA, secret scanning, container scanning, and IaC scanning.
- Example tools: Gitleaks, Semgrep, CodeQL, OWASP ZAP, Burp Suite, Dependabot, Snyk, Trivy, Checkov, ClamAV, SonarQube, Falco, and Wazuh.
- Penetration testing is permitted only on owned systems or with written authorization and a defined scope.
- Test access-control failures, injection, sessions, file handling, rate limits, errors, and tenant isolation.
- Retest fixes and add regression tests for confirmed vulnerabilities.
- Record scan scope, date, tool/version, findings, false positives, and remediation status.
- A clean automated scan does not prove an application is vulnerability-free.

## 14. Standards and references
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- OWASP API Security Top 10: https://owasp.org/www-project-api-security/
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/
- OWASP Cheat Sheet Series: https://cheatsheetseries.owasp.org/
- OWASP File Upload Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html
- OWASP Top 10 for LLM Applications: https://owasp.org/www-project-top-10-for-large-language-model-applications/
- NIST Secure Software Development Framework: https://csrc.nist.gov/Projects/ssdf

## 15. Feature security review checklist
Mark a control complete only when it is implemented and evidence has been reviewed. Mark irrelevant items `N/A` with a reason.

- [ ] Secrets remain server-side and out of Git, logs, and client bundles.
- [ ] Protected operations have server-side authentication and authorization.
- [ ] User input and external responses are validated.
- [ ] Relevant injection, XSS, CSRF, SSRF, traversal, and redirect risks are addressed.
- [ ] Rate limits, request-size limits, and safe errors are applied where needed.
- [ ] File uploads/downloads are validated and access-controlled where relevant.
- [ ] Database permissions, RLS/tenant isolation, and migrations are safe.
- [ ] Webhooks are authenticated and replay-resistant where supported.
- [ ] AI tools are permission-limited and high-impact actions require approval.
- [ ] Logs are redacted and security events observable.
- [ ] Dependencies and deployment settings are reviewed.
- [ ] Relevant tests and security checks actually ran.
- [ ] Residual risks and untested areas are documented.
