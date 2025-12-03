# Debugging Guide - Phase 5 Issues

## Current Status

All code changes have been implemented correctly:
1. ✅ `pointer-events-none` added to TimeSlot time box layer
2. ✅ Grid columns set to `'64px repeat(7, 1fr)'`
3. ✅ Recurrence options present in TimeBoxModal
4. ✅ Multiple time intervals tip added

## Potential Issues

### Issue 1: Browser Cache
**Problem**: Browser may be serving old JavaScript/CSS files

**Solution**: Hard refresh the browser
- **Windows**: `Ctrl + Shift + R` or `Ctrl + F5`
- **Mac**: `Cmd + Shift + R`

### Issue 2: Old localStorage Data
**Problem**: Existing time boxes in localStorage don't have recurrence fields

**Solution**: Clear localStorage and refresh
1. Open browser DevTools (F12)
2. Go to Application tab → Local Storage
3. Find `timebox-store` and delete it
4. Refresh page

### Issue 3: Modal Not Scrolling
**Problem**: Recurrence options are below the fold

**Solution**: Scroll down in the modal
- The modal has `max-h-[90vh] overflow-y-auto`
- Recurrence section is after Color and before Opacity
- Try scrolling or making browser window taller

## Step-by-Step Testing

### Test 1: Drop on Free Space
```
1. Hard refresh browser (Ctrl + Shift + R)
2. Create a project (e.g., "Test Project" at $100/hr)
3. Look at calendar - find a slot WITHOUT a time box
4. Drag the project card from sidebar
5. Drop on empty slot
6. Expected: Time log should be created
7. If not working: Check browser console for errors
```

### Test 2: Recurrence Options
```
1. Hard refresh browser (Ctrl + Shift + R)
2. Click "Time Boxes" button in header
3. Click "Add" button
4. Modal opens - look for these sections in order:
   - Info box (gray background)
   - Time Box Name input
   - Start Time / End Time inputs
   - Color picker (8 colored squares)
   - **Recurrence** (3 radio buttons) ← SCROLL HERE
   - Opacity slider
   - Preview box
   - Cancel / Create buttons
5. If you don't see Recurrence: SCROLL DOWN in the modal
```

### Test 3: Equal Column Widths
```
1. Hard refresh browser (Ctrl + Shift + R)
2. Look at calendar grid
3. Use browser DevTools:
   - Right-click on a day column
   - Inspect element
   - Check computed width
4. All 7 day columns should have same width
5. Time column should be 64px
```

## Browser Console Commands

Open DevTools (F12) and run these in Console:

### Check if recurrence is in TimeBox type
```javascript
// Check localStorage
const timeboxStore = localStorage.getItem('timebox-store')
console.log(JSON.parse(timeboxStore))
```

### Clear all localStorage
```javascript
localStorage.clear()
location.reload()
```

### Check grid columns
```javascript
// Check header grid
const header = document.querySelector('.grid.sticky')
console.log(window.getComputedStyle(header).gridTemplateColumns)
// Should show: "64px 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
```

## File Verification

### Verify TimeSlot.tsx has pointer-events-none
```bash
# Search for pointer-events-none
grep -n "pointer-events-none" src/components/domain/TimeSlot.tsx
# Should show line with: className="absolute inset-0 pointer-events-none"
```

### Verify CalendarView.tsx has grid template
```bash
# Search for gridTemplateColumns
grep -n "gridTemplateColumns" src/components/domain/CalendarView.tsx
# Should show 2 lines with: style={{ gridTemplateColumns: '64px repeat(7, 1fr)' }}
```

### Verify TimeBoxModal.tsx has recurrence
```bash
# Search for Recurrence
grep -n "Recurrence" src/components/domain/TimeBoxModal.tsx
# Should show line with: <label>Recurrence</label>
```

## Common Issues and Solutions

### "I still can't drop on free space"
1. Check browser console for JavaScript errors
2. Verify project card is actually draggable (should show drag cursor)
3. Try dropping on a slot WITH a time box first
4. If that works but free space doesn't, check if time box layer is still blocking

### "I don't see recurrence options"
1. **SCROLL DOWN** in the modal - they're below color picker
2. Clear browser cache (Ctrl + Shift + R)
3. Check if modal is too small - try maximizing browser window
4. Open DevTools and search for "Recurrence" in Elements tab

### "Columns are not equal width"
1. Hard refresh browser (Ctrl + Shift + R)
2. Check if browser zoom is at 100%
3. Open DevTools → Elements → find grid element
4. Check computed style for gridTemplateColumns
5. Should be: "64px 1fr 1fr 1fr 1fr 1fr 1fr 1fr"

## Dev Server Info

**Current URL**: http://localhost:5174/
**Status**: Running
**Last Build**: Successful (237.03 kB / 72.21 kB gzipped)

## Quick Fix Commands

### Restart dev server
```powershell
# Stop current server (Ctrl+C in terminal)
.\dev.ps1
```

### Rebuild from scratch
```powershell
.\build.ps1
.\dev.ps1
```

### Clear node_modules and reinstall
```powershell
Remove-Item -Recurse -Force node_modules
.\setup.ps1
```

## What to Check in Browser

1. **Open DevTools** (F12)
2. **Console tab**: Look for any red errors
3. **Network tab**: Check if files are loading (should see 200 status)
4. **Application tab**: Check localStorage for old data
5. **Elements tab**: Inspect actual DOM to see if elements exist

## Expected Behavior

### Drag and Drop
- Hover over any slot → should show hover effect
- Drag project → cursor changes to copy
- Drag over slot → slot turns light green
- Drop → time log created, toast notification appears

### Time Box Modal
- Opens when clicking "Add" in Time Boxes settings
- Shows all form fields including Recurrence
- Recurrence has 3 radio buttons
- Custom days shows day selector when selected
- Modal is scrollable if content is tall

### Grid Layout
- Time column: narrow (64px)
- Day columns: all equal width
- No horizontal scrolling on wide screens
- Horizontal scroll appears on narrow screens

## If Nothing Works

1. **Clear everything**:
   ```javascript
   localStorage.clear()
   ```

2. **Hard refresh**: `Ctrl + Shift + R`

3. **Check dev server**: Make sure it's running on http://localhost:5174/

4. **Check browser console**: Look for errors

5. **Try different browser**: Test in Chrome/Edge/Firefox

6. **Check file timestamps**: Make sure files were actually saved
   ```powershell
   Get-ChildItem src/components/domain/*.tsx | Select-Object Name, LastWriteTime
   ```

## Contact Points

If issues persist, provide:
1. Screenshot of browser console (F12 → Console tab)
2. Screenshot of Time Box modal
3. Screenshot of calendar grid
4. Browser name and version
5. Any error messages

---

**Last Updated**: After Phase 5 fixes
**Dev Server**: http://localhost:5174/
**Build Status**: ✅ Passing
