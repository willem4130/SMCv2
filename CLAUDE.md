# Claude Development Guide

## Quick Start

To start the development server:
```bash
./start.sh
```

This will:
- Kill any existing process on port 3000
- Clean stale build artifacts
- Start the server in background mode
- Log output to dev-output.log

Wait 3-5 seconds after running, then open http://localhost:3000

## Current Server Status

The dev server is currently running in background mode. It will continue running until:
- You restart your computer
- You manually stop it with: `lsof -ti:3000 | xargs kill -9`
- A system process kills it

To check if it's still running:
```bash
lsof -i :3000
```

## Localhost Connection Issues (IMPORTANT)

If localhost refuses to connect when running `npm run dev`, follow these steps:

### Root Cause
1. Node.js v24+ has compatibility issues with Next.js
2. Next.js dev server crashes silently after initial startup
3. Turbopack has critical runtime errors with Node v24

### Immediate Fixes
1. **Check if server is actually running**:
   ```bash
   lsof -i :3000
   ps aux | grep "next dev"
   ```

2. **Start server in background mode** (most reliable):
   ```bash
   nohup npm run dev > dev-output.log 2>&1 &
   ```
   Then wait 3-5 seconds for server to fully start.

3. **Clean Build Artifacts** if errors persist:
   ```bash
   rm -rf .next node_modules package-lock.json
   npm install
   ```

4. **Avoid Turbopack**: Already removed from package.json dev script

5. **Use Debug Script**: Run `./scripts/dev-debug.sh` for automated troubleshooting

### Permanent Solutions
- Always use Node.js LTS versions (v20 or v22) instead of v24
- Keep .nvmrc file with stable Node version
- Run server in background with nohup for stability
- Monitor dev-output.log for runtime errors

### Testing Commands
After starting dev server, test with:
```bash
# Check if process is listening
lsof -i :3000

# Test connection
curl -I http://localhost:3000
```

### Known Issues
- Server says "Ready" but crashes immediately with module errors
- Turbopack incompatible with Node v24
- Build cache corruption causes missing runtime files

## Project-Specific Notes
- This is a Next.js 15.3.5 project with TypeScript
- Uses Prisma for database
- NextAuth for authentication
- Tailwind CSS for styling
- Framer Motion for animations