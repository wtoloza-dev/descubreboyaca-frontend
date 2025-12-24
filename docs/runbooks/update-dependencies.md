# Runbook: Update Dependencies

## Purpose

Update all npm dependencies to their latest versions and sync `package.json` with the installed versions.

## Prerequisites

- Node.js installed
- Access to npm registry (network required)

## Execution Requirements

- **Permissions:** Run outside sandbox (`all` permissions required)
- **Network:** Required for npm registry access

## Steps

### 1. Check for outdated packages

```bash
cd /path/to/project
npm outdated
```

This shows a table with:
- `Current`: Version installed
- `Wanted`: Max version satisfying semver in package.json
- `Latest`: Latest version available

### 2. Update packages

```bash
npm update
```

This updates packages within the semver range defined in `package.json`.

### 3. Check for remaining outdated (major versions)

```bash
npm outdated
```

If packages remain outdated, they require major version updates (breaking changes).

### 4. Update major versions (if needed)

```bash
npm install <package>@latest
```

Example:
```bash
npm install @types/node@22
```

### 5. Run security audit

```bash
npm audit
```

If vulnerabilities found:
```bash
npm audit fix
# or for breaking changes:
npm audit fix --force
```

### 6. Sync package.json

Update `package.json` to reflect the actual installed versions with caret (`^`) for minor/patch auto-updates:

```json
{
  "dependencies": {
    "package-name": "^X.Y.Z"
  }
}
```

Use `npm ls --depth=0` to see exact installed versions.

### 7. Verify installation

```bash
npm ls --depth=0
npm outdated  # Should show minimal or no outdated packages
```

### 8. Test the application

```bash
npm run build
npm run dev
```

## Expected Outcome

- All dependencies updated to latest versions
- `package.json` reflects current versions with `^` prefix
- Zero security vulnerabilities
- Application builds and runs correctly

## Rollback

If issues occur:
```bash
git checkout package.json package-lock.json
npm install
```

