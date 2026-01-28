# Commit Message Guidelines

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for automated versioning and changelog generation.

## Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Types

- **feat**: A new feature (triggers MINOR version bump)
- **fix**: A bug fix (triggers PATCH version bump)
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (white-space, formatting)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvements
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to build process or auxiliary tools

## Breaking Changes

Add `!` after type or `BREAKING CHANGE:` in footer to trigger MAJOR version bump:

```
feat!: change Button API

BREAKING CHANGE: removed `variant` prop, use `type` instead
```

## Examples

### Patch Release (0.1.1 → 0.1.2)

```bash
git commit -m "fix: button hover color in dark mode"
git commit -m "docs: update installation instructions"
```

### Minor Release (0.1.1 → 0.2.0)

```bash
git commit -m "feat: add Input component"
git commit -m "feat(Button): add new size variant"
```

### Major Release (0.1.1 → 1.0.0)

```bash
git commit -m "feat!: redesign component API"
```

or

```bash
git commit -m "feat: new component system

BREAKING CHANGE: all components now require ThemeProvider wrapper"
```

## Workflow

1. Make your changes
2. Commit with conventional format: `git commit -m "feat: add feature"`
3. Push to main branch: `git push`
4. GitHub Actions automatically:
   - Analyzes commits
   - Determines version bump
   - Updates package.json and CHANGELOG.md
   - Creates GitHub release
   - Publishes to NPM

## Scopes (Optional)

Use scopes to specify which part changed:

- `feat(Button): add loading state`
- `fix(Card): border radius on mobile`
- `docs(README): update examples`
