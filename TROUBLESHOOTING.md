# Troubleshooting Size Selector Not Appearing

## Steps to Fix:

### 1. Clear Browser Cache
- **Chrome/Edge**: Press `Ctrl + Shift + Delete` → Clear "Cached images and files"
- **Or**: Hard refresh with `Ctrl + Shift + R` or `Ctrl + F5`

### 2. Restart Development Server
```bash
# Stop the current server (Ctrl+C)
npm run dev
```

### 3. Clear Vite Cache
```bash
# Delete the .vite cache folder
rm -rf node_modules/.vite
npm run dev
```

### 4. Verify the Data
Open browser console (F12) and check:
- Navigate to `/shop/product/1`
- Look for any JavaScript errors
- The size selector should appear between Description and Quantity

### 5. Check Product Data
The product should have:
```typescript
{
  hasSizes: true,
  sizes: ["8oz", "10oz", "12oz", "14oz", "16oz"]
}
```

### 6. Nuclear Option - Full Rebuild
```bash
# Stop dev server
# Clear everything
rm -rf node_modules/.vite
rm -rf dist

# Restart
npm run dev
```

## Expected Behavior
When viewing Product ID 1 (Professional Boxing Gloves), you should see:
1. A bordered box with the title "Select Size (Weight) *"
2. Five buttons: 8oz, 10oz, 12oz, 14oz, 16oz
3. The first size (8oz) should be selected by default
4. Text below showing "Selected: 8oz"
