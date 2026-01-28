# semantic-release Setup Complete! 🎉

## ✅ What's Installed

- semantic-release and all required plugins
- GitHub Actions workflow (.github/workflows/release.yml)
- Release configuration (.releaserc.json)
- CHANGELOG.md (will auto-update)
- CONTRIBUTING.md (commit guidelines)

## 🔐 Final Step: NPM Token

### 1. Create NPM Automation Token

Visit: https://www.npmjs.com/settings/YOUR_USERNAME/tokens

1. Click **"Generate New Token"** → **"Granular Access Token"**
2. Settings:
   - **Name:** widgetz-github-actions
   - **Expiration:** 90 days (or longer)
   - **Packages:** Read and write
   - **Organizations:** Select mrtek if available
   - ✅ **Automation:** Enable (this bypasses 2FA)
3. Copy the token

### 2. Add to GitHub Secrets

Visit: https://github.com/mrteksoftwares/widgetz/settings/secrets/actions

1. Click **"New repository secret"**
2. Name: `NPM_TOKEN`
3. Value: Paste your token
4. Click **"Add secret"**

## 🚀 How It Works Now

### 1. Make Changes

```bash
# Edit code, add features, fix bugs
```

### 2. Commit with Conventional Format

```bash
# For bug fixes (PATCH: 0.1.1 → 0.1.2)
git commit -m "fix: button hover color in dark mode"

# For new features (MINOR: 0.1.1 → 0.2.0)
git commit -m "feat: add Input component"
git commit -m "feat(Card): add loading state"

# For breaking changes (MAJOR: 0.1.1 → 1.0.0)
git commit -m "feat!: redesign Button API"
```

### 3. Push to Main

```bash
git push origin main
```

### 4. Automatic Process

GitHub Actions will:

- ✅ Analyze your commits
- ✅ Determine new version
- ✅ Update package.json
- ✅ Update CHANGELOG.md
- ✅ Build the package
- ✅ Publish to NPM
- ✅ Create GitHub Release
- ✅ Commit changes back to repo

## 📝 Commit Types

| Type       | Description   | Version Bump | Example                     |
| ---------- | ------------- | ------------ | --------------------------- |
| `feat`     | New feature   | MINOR        | `feat: add Input component` |
| `fix`      | Bug fix       | PATCH        | `fix: button hover bug`     |
| `docs`     | Documentation | None         | `docs: update README`       |
| `style`    | Code style    | None         | `style: format code`        |
| `refactor` | Code refactor | None         | `refactor: simplify logic`  |
| `perf`     | Performance   | PATCH        | `perf: optimize render`     |
| `test`     | Tests         | None         | `test: add button tests`    |
| `chore`    | Maintenance   | None         | `chore: update deps`        |

### Breaking Changes

Add `!` or `BREAKING CHANGE:` footer:

```bash
feat!: new Button API
# or
feat: redesign components

BREAKING CHANGE: removed old props
```

## 🎯 Test First Release

After adding NPM_TOKEN:

```bash
git add .
git commit -m "chore: setup semantic-release"
git push origin main
```

Watch: https://github.com/mrteksoftwares/widgetz/actions

## 📚 Documentation

- [CONTRIBUTING.md](CONTRIBUTING.md) - Full commit guidelines
- [CHANGELOG.md](CHANGELOG.md) - Auto-generated changelog
- [Conventional Commits](https://www.conventionalcommits.org/)

## 🔧 Manual Release (if needed)

```bash
npm run semantic-release
```

## ❗ Important Notes

1. **Only push to `main` branch** - releases happen automatically
2. **Use correct commit format** - wrong format = no release
3. **NPM_TOKEN must not expire** - set long expiration
4. **GitHub token is automatic** - no setup needed
5. **First release** will be from current version (0.1.1)

---

**Next Steps:**

1. Add NPM_TOKEN to GitHub Secrets
2. Make a test commit: `git commit -m "chore: test semantic-release"`
3. Push and watch GitHub Actions
