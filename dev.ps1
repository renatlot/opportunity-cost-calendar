# Start Development Server
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

Write-Host "Starting Vite development server..." -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

& $npmPath run dev
