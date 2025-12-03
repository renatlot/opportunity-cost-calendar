# Opportunity Cost Calendar - Setup Guide

## Prerequisites
Ensure you have Node.js (v18+) installed.
Download from: https://nodejs.org/

## Windows Setup (Node.js not in PATH)

If you get "node is not recognized" errors, use the provided PowerShell scripts:

### Step 1: Install Dependencies
```powershell
.\setup.ps1
```

This script:
- Locates Node.js installation
- Temporarily adds Node.js to PATH
- Installs all dependencies
- Takes 1-2 minutes

### Step 2: Start Development Server
```powershell
.\dev.ps1
```

### Step 3: Build for Production
```powershell
.\build.ps1
```

## Standard Setup (Node.js in PATH)

If `node --version` works in your terminal:

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development
```bash
npm run dev
```

## Step 3: Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: Project scaffolding"
```

## Step 4: Link to GitHub (Manual)
1. Create a new empty repository on GitHub (do NOT initialize with README)
2. Copy the repository URL
3. Run:
```bash
git remote add origin <YOUR_GITHUB_REPO_URL>
git branch -M main
git push -u origin main
```

## Step 5: Start Development Server
```bash
npm run dev
```

Your app will be available at `http://localhost:5173`
