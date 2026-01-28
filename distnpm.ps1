# widgetz NPM Package Publisher
# Builds and publishes the widgetz package to npmjs.org
# Package: https://www.npmjs.com/package/widgetz

Write-Host "Building and publishing widgetz to NPM..." -ForegroundColor Cyan
Write-Host "Package: https://www.npmjs.com/package/widgetz" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
  Write-Host "Error: package.json not found!" -ForegroundColor Red
  Write-Host "Please run this script from the project root directory." -ForegroundColor Yellow
  exit 1
}

# Read package.json to get current version
$packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
$currentVersion = $packageJson.version
Write-Host "Current version: $currentVersion" -ForegroundColor White
Write-Host ""

# Confirm publishing
Write-Host "Are you sure you want to publish widgetz@$currentVersion to NPM?" -ForegroundColor Yellow
Write-Host "Press Y to continue, any other key to cancel..." -ForegroundColor Yellow
$confirmation = Read-Host

if ($confirmation -ne "Y" -and $confirmation -ne "y") {
  Write-Host "Publishing cancelled." -ForegroundColor Yellow
  exit 0
}

Write-Host ""

# Check if logged in to npm
Write-Host "Checking NPM authentication..." -ForegroundColor Yellow
npm whoami 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Error: Not logged in to NPM!" -ForegroundColor Red
  Write-Host "Please run: npm login" -ForegroundColor Yellow
  exit 1
}

$npmUser = npm whoami
Write-Host "Logged in as: $npmUser" -ForegroundColor Green
Write-Host ""

# Clean previous build
if (Test-Path "dist") {
  Write-Host "Cleaning previous build..." -ForegroundColor Yellow
  Remove-Item -Recurse -Force dist
}

# Run build
Write-Host "Building package..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
  Write-Host "Build failed!" -ForegroundColor Red
  exit 1
}

Write-Host "Build completed successfully!" -ForegroundColor Green
Write-Host ""

# Publish to NPM
Write-Host "Publishing to NPM..." -ForegroundColor Yellow
npm publish --access public

if ($LASTEXITCODE -ne 0) {
  Write-Host ""
  Write-Host "Publishing failed!" -ForegroundColor Red
  Write-Host ""
  Write-Host "Common issues:" -ForegroundColor Yellow
  Write-Host "  1. Version already published - Update version in package.json" -ForegroundColor White
  Write-Host "  2. 2FA required - Use: npm publish --access public --otp=XXXXXX" -ForegroundColor White
  Write-Host "  3. Authentication issue - Run: npm login" -ForegroundColor White
  Write-Host ""
  exit 1
}

Write-Host ""
Write-Host "SUCCESS! Package published successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Package Details:" -ForegroundColor Cyan
Write-Host "  Name: widgetz" -ForegroundColor White
Write-Host "  Version: $currentVersion" -ForegroundColor White
Write-Host "  NPM: https://www.npmjs.com/package/widgetz" -ForegroundColor White
Write-Host "  Install: npm install widgetz" -ForegroundColor White
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Update README.md if needed" -ForegroundColor White
Write-Host "  2. Create a git tag: git tag v$currentVersion" -ForegroundColor White
Write-Host "  3. Push tag: git push origin v$currentVersion" -ForegroundColor White
Write-Host "  4. Create GitHub release" -ForegroundColor White
Write-Host ""
