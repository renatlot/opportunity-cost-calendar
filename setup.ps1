# Opportunity Cost Calendar - Setup Script for Windows
# This script sets up the project when Node.js is not in PATH

Write-Host "=== Opportunity Cost Calendar Setup ===" -ForegroundColor Cyan
Write-Host ""

# Define Node.js paths
$nodeDir = "C:\Program Files\nodejs"
$nodePath = "$nodeDir\node.exe"
$npmPath = "$nodeDir\npm.cmd"

# Check if Node.js exists
if (-not (Test-Path $nodePath)) {
    Write-Host "ERROR: Node.js not found at $nodePath" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Display Node.js version
Write-Host "Node.js found!" -ForegroundColor Green
$nodeVersion = & $nodePath --version
Write-Host "Version: $nodeVersion" -ForegroundColor Green
Write-Host ""

# Add Node.js to PATH temporarily for this session
$env:Path = "$nodeDir;$env:Path"

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Cyan
Write-Host "(This may take a few minutes...)" -ForegroundColor Yellow
Write-Host ""
& $npmPath install

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=== Setup Complete! ===" -ForegroundColor Green
    Write-Host ""
    Write-Host "To start development server, run:" -ForegroundColor Yellow
    Write-Host "  .\dev.ps1" -ForegroundColor White
    Write-Host ""
    Write-Host "Or manually:" -ForegroundColor Yellow
    Write-Host "  & 'C:\Program Files\nodejs\npm.cmd' run dev" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "ERROR: Installation failed!" -ForegroundColor Red
    Write-Host "Check the error messages above." -ForegroundColor Yellow
}
