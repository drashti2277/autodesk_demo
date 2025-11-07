# 📋 Simple Instructions - For Your Presentation

## Setup (Do This Once)

### 1. Push to GitHub

```bash
cd /workspace

# Initialize git
git init
git add .
git commit -m "Autodesk MCP Server Demo"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/autodesk-mcp-demo.git
git push -u origin main
```

See `GIT_SETUP.md` for detailed instructions.

### 2. Clone on Demo Machine

```bash
git clone https://github.com/YOUR_USERNAME/autodesk-mcp-demo.git
cd autodesk-mcp-demo
pip install -r requirements.txt
```

## Running the Demo (For Your Presentation)

### Just One Command:

```bash
python standalone_demo.py
```

That's it! 🎉

The script will run through **9 demonstrations** showing:
1. List all 7 MCP tools
2. Browse available models
3. Analyze office building
4. Calculate materials for warehouse
5. Compare two buildings
6. Generate cost estimate
7. Search for components
8. Get Autodesk help
9. Complex multi-step workflow

Press ENTER between each demo to control the pace.

## What You'll Show

### The Story:
> "Autodesk announced MCP servers coming soon. I built one using the Model Context Protocol to show what developers can create TODAY."

### The Demo:
1. **Start the script** - `python standalone_demo.py`
2. **Show each demo** - Press ENTER to advance
3. **Highlight the complex workflow** - Demo #9 shows AI orchestrating multiple tools
4. **Show the code** - Open `autodesk_mcp_server.py` and point out `@app.tool()` decorators

### Key Points:
- ✅ Works standalone (no Claude Desktop needed for demo)
- ✅ 7 specialized MCP tools
- ✅ Uses `mcp.tool()` decorators
- ✅ Production-ready patterns
- ✅ 300+ lines of clean Python

## File Structure (What You Created)

```
autodesk-mcp-demo/
├── autodesk_mcp_server.py     # The MCP server (show this code!)
├── standalone_demo.py          # Run this for presentation
├── requirements.txt            # Just: mcp
├── README.md                   # Full documentation
└── [other docs]
```

## Your Talking Points

**Opening:**
"Autodesk is building MCP servers. I couldn't wait, so I built one."

**During Demo:**
- "These are real MCP tools using the official SDK"
- "Notice how simple the code is - just Python decorators"
- "This demonstrates context-aware Autodesk workflows"
- "Watch demo #9 - this is the power of MCP orchestration"

**Showing Code:**
```python
@app.tool()
async def call_tool(name: str, arguments: Any):
    # Simple Python logic
    # MCP handles all the AI communication
```

**Closing:**
"This is what developers can build RIGHT NOW with MCP. The protocol exists. The tools work. Let's innovate."

## Troubleshooting

### If demo fails:
1. Check Python version: `python --version` (need 3.10+)
2. Reinstall MCP: `pip install --upgrade mcp`
3. Show the code instead and walk through it

### If questions about Claude Desktop:
"This demo runs standalone to show the MCP tools working. For the full AI experience where Claude orchestrates these tools automatically, you'd integrate with Claude Desktop - but that's optional. The MCP server works with any MCP-compatible AI client."

## After the Demo

Share the repo:
```
git clone https://github.com/YOUR_USERNAME/autodesk-mcp-demo.git
```

Or create a QR code to your GitHub repo.

---

## Quick Reference Card

**COMMAND TO RUN:**
```bash
python standalone_demo.py
```

**TOOLS DEMONSTRATED:**
7 MCP tools for Autodesk workflows

**KEY MESSAGE:**
Developers can build MCP servers TODAY

**REPO TO SHARE:**
https://github.com/YOUR_USERNAME/autodesk-mcp-demo

---

That's it! Keep it simple. Run the script. Show the results. Share the code. 🚀
