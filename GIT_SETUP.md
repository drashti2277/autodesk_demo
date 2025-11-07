# 🔧 Git Setup Guide

Quick guide to push this demo to your GitHub repository.

## Initial Setup

### 1. Initialize Git (if not already done)

```bash
cd /workspace
git init
```

### 2. Add all files

```bash
git add .
```

### 3. Make initial commit

```bash
git commit -m "Initial commit: Autodesk MCP Server Demo

- 7 MCP tools for Autodesk workflows
- Standalone demo script (no Claude Desktop needed)
- Complete documentation
- Sample Revit, AutoCAD, and Inventor models"
```

### 4. Create GitHub repository

Go to https://github.com/new and create a new repository named `autodesk-mcp-demo`

### 5. Add remote and push

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/autodesk-mcp-demo.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Clone on Another Machine

Once pushed to GitHub, anyone can clone and run:

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/autodesk-mcp-demo.git
cd autodesk-mcp-demo

# Install dependencies
pip install -r requirements.txt

# Run the demo!
python standalone_demo.py
```

## Updating the Repo

After making changes:

```bash
git add .
git commit -m "Description of changes"
git push
```

## What Gets Pushed

✅ **Included:**
- `autodesk_mcp_server.py` - Main MCP server
- `standalone_demo.py` - Standalone demo script
- All documentation (*.md files)
- `requirements.txt`
- `test_server.py`
- Configuration examples

❌ **Excluded (.gitignore):**
- `__pycache__/`
- `*.pyc`
- Virtual environments
- IDE files

## Quick Commands Reference

```bash
# Status check
git status

# See what changed
git diff

# View commit history
git log --oneline

# Pull latest changes
git pull

# Create a branch
git checkout -b feature-name

# Switch branches
git checkout main
```

## Repository Description

When creating your GitHub repo, use this description:

```
🏗️ Autodesk MCP Server Demo - Model Context Protocol tools for Design & Make workflows. 
7 specialized tools, standalone demo, production-ready patterns. No Claude Desktop needed!
```

## README on GitHub

The `README.md` will be automatically displayed on your GitHub repo homepage with:
- Project overview
- Installation instructions
- Usage examples
- Architecture details

Perfect for sharing with others!

## Sharing Your Demo

Once pushed, share your repo with:
- Direct link: `https://github.com/YOUR_USERNAME/autodesk-mcp-demo`
- QR code (generate at https://qr-code-generator.com)
- Clone command: `git clone https://github.com/YOUR_USERNAME/autodesk-mcp-demo.git`

---

That's it! Your Autodesk MCP Server demo is now version controlled and shareable! 🚀
