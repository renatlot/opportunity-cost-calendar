# Windows Setup Guide

## Issue: Node.js Not in PATH

If you see this error:
```
'node' is not recognized as an internal or external command
```

Node.js is installed but not accessible from PowerShell/CMD.

## Solution: Use Provided Scripts

We've created PowerShell scripts that locate and use Node.js directly.

### 1. Install Dependencies

```powershell
.\setup.ps1
```

**What it does:**
- Finds Node.js at `C:\Program Files\nodejs\`
- Temporarily adds it to PATH
- Runs `npm install`
- Installs all 256 packages

**Expected output:**
```
=== Opportunity Cost Calendar Setup ===

Node.js found!
Version: v24.11.1

Installing dependencies...
(This may take a few minutes...)

added 256 packages, and audited 257 packages in 7s

=== Setup Complete! ===
```

### 2. Start Development Server

```powershell
.\dev.ps1
```

**What it does:**
- Starts Vite development server
- Opens at `http://localhost:5173`
- Hot module replacement enabled

**Expected output:**
```
Starting Vite development server...
Press Ctrl+C to stop

  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 3. Build for Production

```powershell
.\build.ps1
```

**What it does:**
- Compiles TypeScript
- Bundles with Vite
- Outputs to `dist/` folder

## Alternative: Add Node.js to PATH Permanently

If you want to use `npm` commands directly:

### Option A: Environment Variables (GUI)
1. Press `Win + X` → System
2. Click "Advanced system settings"
3. Click "Environment Variables"
4. Under "System variables", find "Path"
5. Click "Edit"
6. Click "New"
7. Add: `C:\Program Files\nodejs`
8. Click OK on all dialogs
9. **Restart PowerShell/CMD**

### Option B: PowerShell Command
```powershell
# Run as Administrator
[Environment]::SetEnvironmentVariable(
    "Path",
    [Environment]::GetEnvironmentVariable("Path", "Machine") + ";C:\Program Files\nodejs",
    "Machine"
)
```

Then restart your terminal and verify:
```powershell
node --version
npm --version
```

## Troubleshooting

### Script Execution Policy Error
If you see:
```
cannot be loaded because running scripts is disabled
```

Run this once:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Node.js Not Found
If scripts can't find Node.js, check installation location:
```powershell
Test-Path "C:\Program Files\nodejs\node.exe"
```

If `False`, Node.js might be installed elsewhere. Common locations:
- `C:\Program Files (x86)\nodejs\`
- `C:\Users\YourName\AppData\Roaming\npm\`

Edit the scripts to use the correct path.

### Port Already in Use
If port 5173 is busy:
```powershell
# Find process using port
netstat -ano | findstr :5173

# Kill process (replace PID)
taskkill /PID <PID> /F
```

### Dependencies Installation Failed
If `setup.ps1` fails:
1. Check internet connection
2. Try again (sometimes npm registry is slow)
3. Clear npm cache:
   ```powershell
   & "C:\Program Files\nodejs\npm.cmd" cache clean --force
   ```

## Quick Reference

| Task | Command |
|------|---------|
| Install dependencies | `.\setup.ps1` |
| Start dev server | `.\dev.ps1` |
| Build for production | `.\build.ps1` |
| Run linter | `& "C:\Program Files\nodejs\npm.cmd" run lint` |
| Run any npm command | `& "C:\Program Files\nodejs\npm.cmd" run <command>` |

## Using Kiro Hooks

The Kiro hooks are configured to work with these scripts:

1. **Pre-Commit Check Hook**
   - Manually update to use: `.\build.ps1`

2. **Dev Server Hook**
   - Manually update to use: `.\dev.ps1`

Or add Node.js to PATH permanently (recommended for Kiro integration).

## Next Steps

After successful setup:
1. ✅ Dependencies installed
2. Run `.\dev.ps1` to start development
3. Open `http://localhost:5173` in browser
4. See the demo application
5. Start implementing Phase 2 tasks from `.kiro/specs/opportunity-calendar/tasks.md`

## Support

If you continue having issues:
1. Verify Node.js version: Should be v18+ (you have v24.11.1 ✅)
2. Check the error logs in `C:\Users\YourName\AppData\Local\npm-cache\_logs\`
3. Try reinstalling Node.js from https://nodejs.org/
