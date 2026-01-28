# widgetz Web Documentation Builder
# Builds the documentation site for deployment to widgetz.mr1.com.tr
# Output: web/dist/ directory (ready for deployment)

Write-Host "Building widgetz documentation site..." -ForegroundColor Cyan
Write-Host "Target: https://widgetz.mr1.com.tr" -ForegroundColor Cyan
Write-Host ""

# Check if web directory exists
if (-not (Test-Path "web")) {
  Write-Host "Error: web/ directory not found!" -ForegroundColor Red
  exit 1
}

# Navigate to web directory
Set-Location web

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
  Write-Host "Installing dependencies..." -ForegroundColor Yellow
  npm install
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to install dependencies!" -ForegroundColor Red
    Set-Location ..
    exit 1
  }
}

# Clean previous build
if (Test-Path "dist") {
  Write-Host "Cleaning previous build..." -ForegroundColor Yellow
  Remove-Item -Recurse -Force dist
}

# Build the project
Write-Host "Building production bundle..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
  Write-Host "Build failed!" -ForegroundColor Red
  Set-Location ..
  exit 1
}

# Go back to root
Set-Location ..

Write-Host ""
Write-Host "Documentation site built successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Output location: web/dist/" -ForegroundColor Cyan
Write-Host "Ready for deployment to: https://widgetz.mr1.com.tr" -ForegroundColor Cyan
Write-Host ""
