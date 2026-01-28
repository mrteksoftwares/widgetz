# widgetz Web Documentation Builder
# Builds the documentation site for deployment to widgetz.mrtek.com.tr
# Output: web/dist/ directory (ready for deployment)

Write-Host "Building widgetz documentation site..." -ForegroundColor Cyan
Write-Host "Target: https://widgetz.mrtek.com.tr" -ForegroundColor Cyan
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
Write-Host "Ready for deployment to: https://widgetz.mrtek.com.tr" -ForegroundColor Cyan
Write-Host ""
Write-Host "Deployment Options:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  Option 1: Vercel/Netlify" -ForegroundColor White
Write-Host "    - Root Directory: web/" -ForegroundColor Gray
Write-Host "    - Build Command: npm run build" -ForegroundColor Gray
Write-Host "    - Output Directory: dist/" -ForegroundColor Gray
Write-Host "    - Custom Domain: widgetz.mrtek.com.tr" -ForegroundColor Gray
Write-Host ""
Write-Host "  Option 2: cPanel/DirectAdmin (FTP)" -ForegroundColor White
Write-Host "    1. Connect to widgetz.mrtek.com.tr subdomain folder" -ForegroundColor Gray
Write-Host "    2. Upload all files from web/dist/ to public_html/" -ForegroundColor Gray
Write-Host "    3. Ensure SSL/HTTPS is enabled" -ForegroundColor Gray
Write-Host ""
Write-Host "  Option 3: GitHub Pages + Custom Domain" -ForegroundColor White
Write-Host "    1. git add web/dist/" -ForegroundColor Gray
Write-Host "    2. git commit -m Deploy" -ForegroundColor Gray
Write-Host "    3. git push" -ForegroundColor Gray
Write-Host "    4. Configure DNS: CNAME widgetz to pages" -ForegroundColor Gray
Write-Host ""
