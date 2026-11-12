# Input Validation & Data Integrity Rules

These rules must be considered in every project.

## 1. Field-Specific Validation
- Every input must accept only data appropriate for its purpose.
- Name fields must support legitimate international names.
- Email fields must validate email format.
- Phone fields must validate phone-number formats.
- Numeric fields must enforce expected numeric ranges.
- Message and description fields must enforce appropriate length limits.
- Do not apply one generic validation rule to every field.

## 2. Frontend Validation
- Provide clear, field-specific error messages.
- Validate on blur and form submission.
- Avoid unnecessary errors while users are typing.
- Prevent submission when required fields are invalid.
- Make validation accessible and responsive.

## 3. Backend Validation
- Validate all incoming data on the server.
- Never trust frontend validation alone.
- Enforce data types, required fields, length limits and allowed formats.
- Reject malformed or unexpected payloads.
- Normalize input safely where appropriate.

## 4. Security
- Prevent injection vulnerabilities through appropriate context-specific handling.
- Never rely on regex alone for security.
- Use parameterized database queries.
- Escape untrusted content when rendering HTML.
- Protect sensitive data and credentials.
- Never log passwords, tokens, API keys or other secrets.

## 5. Maintainability
- Reuse validation schemas and utilities where appropriate.
- Keep frontend and backend validation rules consistent.
- Use established validation libraries only when justified by project complexity.
- Document project-specific validation rules.
- Test valid, invalid, boundary and malicious input cases.

## 6. Project-Specific Requirements
Before implementation, identify each field's purpose and define its validation rules.

Do not blindly reuse rules that are inappropriate for a particular field or application.

