# Build for Production
# Use this script when Node.js is not in PATH

$nodeDir = "C:\Program Files\nodejs"
$npmPath = "$nodeDir\npm.cmd"

if (-not (Test-Path $npmPath)) {
    Write-Host "ERROR: npm not found at $npmPath" -ForegroundColor Red
    Write-Host "Please run setup.ps1 first" -ForegroundColor Yellow
    exit 1
}

# Add Node.js to PATH temporarily for this session
$env:Path = "$nodeDir;$env:Path"

Write-Host "Building for production..." -ForegroundColor Cyan
& $npmPath run build

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Build successful!" -ForegroundColor Green
    Write-Host "Output directory: dist/" -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "Build failed!" -ForegroundColor Red
}
