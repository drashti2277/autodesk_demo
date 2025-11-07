# 🚀 Autodesk MCP Server - Setup Guide

Complete step-by-step guide to get the demo running for your presentation.

## Prerequisites Checklist

- [ ] Python 3.10 or higher installed
- [ ] pip package manager available
- [ ] Claude Desktop installed (or another MCP-compatible client)
- [ ] Text editor for config files

## Step 1: Verify Python Installation

```bash
python --version
# Should show Python 3.10 or higher

# If not, download from: https://www.python.org/downloads/
```

## Step 2: Install Dependencies

```bash
# Navigate to the project directory
cd /workspace

# Install the MCP Python SDK
pip install mcp

# Verify installation
pip show mcp
```

## Step 3: Test the Server

```bash
# Run the test script
python test_server.py
```

You should see:
```
✅ MCP SDK installed and importable
✅ Server module imported successfully
✅ Sample data loaded: 5 models available
✅ Help content loaded for 3 products
🎉 All tests passed! Server is ready to use.
```

## Step 4: Configure Claude Desktop

### macOS

1. Open config file:
```bash
open ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

2. Add this configuration:
```json
{
  "mcpServers": {
    "autodesk-demo": {
      "command": "python",
      "args": [
        "/workspace/autodesk_mcp_server.py"
      ]
    }
  }
}
```

**Important:** Replace `/workspace/autodesk_mcp_server.py` with the full absolute path to your file!

To get the full path:
```bash
cd /workspace
pwd
# Use the output + /autodesk_mcp_server.py
```

### Windows

1. Open config file:
```
%APPDATA%\Claude\claude_desktop_config.json
```

2. Add this configuration:
```json
{
  "mcpServers": {
    "autodesk-demo": {
      "command": "python",
      "args": [
        "C:\\path\\to\\autodesk_mcp_server.py"
      ]
    }
  }
}
```

### Linux

1. Open config file:
```bash
nano ~/.config/Claude/claude_desktop_config.json
```

2. Add the configuration (same as macOS, with correct path)

## Step 5: Restart Claude Desktop

1. Quit Claude Desktop completely
2. Relaunch it
3. You should see the MCP server icon in the interface

## Step 6: Test in Claude

Try these queries:

```
"What Autodesk models are available?"

"Tell me about the office building"

"Calculate materials for the warehouse"
```

If you see responses with data about the models, **it's working!** 🎉

## Troubleshooting

### Issue: "Module 'mcp' not found"

**Solution:**
```bash
pip install --upgrade mcp
```

### Issue: Server doesn't appear in Claude Desktop

**Solutions:**
1. Check the config file path is correct
2. Verify the Python path in config is absolute (not relative)
3. Check Claude Desktop logs:
   - macOS: `~/Library/Logs/Claude/mcp*.log`
   - Windows: `%APPDATA%\Claude\logs\mcp*.log`

### Issue: "Permission denied" when running server

**Solution:**
```bash
chmod +x autodesk_mcp_server.py
```

### Issue: Import errors when running

**Solution:**
Make sure you're in the correct directory and using the right Python:
```bash
which python
python -c "import mcp; print(mcp.__version__)"
```

## Step 7: Prepare for Demo

### Practice These Queries

1. **Introduction**
   - "What is this Autodesk MCP server?"
   - "What models are available?"

2. **Exploration**
   - "Analyze the office building model"
   - "What are the key statistics for all Revit models?"

3. **Calculations**
   - "Calculate material quantities for the warehouse"
   - "Generate a cost estimate for the office building"

4. **Comparison**
   - "Compare the office building with the residential home"
   - "Which building has the most components?"

5. **Reports**
   - "Generate a comprehensive report for the office building in markdown format"
   - "Create a quantity takeoff report for all models"

6. **Help**
   - "How do I work with Revit families?"
   - "Explain AutoCAD layers"

### Demo Flow Suggestion

1. **Hook** (30 seconds)
   - "Autodesk announced MCP servers coming soon. But we can build them today!"

2. **Show the Code** (1 minute)
   - Open `autodesk_mcp_server.py`
   - Highlight the `@app.tool()` decorators
   - Show how simple the tools are

3. **Live Demo** (3 minutes)
   - List models
   - Explore a model
   - Calculate materials
   - Generate a report
   - Get help content

4. **Show Intelligence** (1 minute)
   - Ask a complex query: "Analyze all buildings and recommend which one is most cost-effective per square foot"
   - Let AI combine multiple tools

5. **Wrap Up** (30 seconds)
   - "This is what developers can build today with MCP"
   - "Imagine what's possible with official Autodesk Platform Services integration"

## Advanced: Run as Standalone

If you want to test the server without Claude Desktop:

```bash
# The server uses stdio transport
echo '{"jsonrpc":"2.0","method":"initialize","params":{},"id":1}' | python autodesk_mcp_server.py
```

## Next Steps After Demo

- Integrate with real Autodesk Platform Services (APS) APIs
- Add authentication and authorization
- Connect to actual Revit files via RevitPythonShell
- Deploy as a hosted service
- Add more tools for specific workflows

## Resources

- **MCP Docs:** https://modelcontextprotocol.io/
- **Autodesk APS:** https://aps.autodesk.com/
- **Python MCP SDK:** https://github.com/modelcontextprotocol/python-sdk

---

## Quick Reference Card

Print or keep this handy during your demo:

```
🎯 PROJECT: Autodesk MCP Server Demo
📁 LOCATION: /workspace/
🐍 COMMAND: python autodesk_mcp_server.py
⚙️ CONFIG: ~/.../Claude/claude_desktop_config.json

📊 SAMPLE MODELS:
- office-building-01.rvt (5 floors, 45K sqft)
- residential-home-02.rvt (2 floors, 3.5K sqft)
- warehouse-facility-03.rvt (125K sqft)
- bridge-design-01.dwg (450ft span)
- mechanical-assembly-01.ipt (247 parts)

🛠️ KEY TOOLS:
1. list_available_models
2. explore_model_data
3. calculate_material_takeoff
4. compare_model_versions
5. search_model_components
6. generate_model_report
7. get_autodesk_help

✨ DEMO QUERIES:
"What models are available?"
"Analyze the office building"
"Calculate materials for warehouse"
"Compare all Revit models"
"Generate cost estimate report"
```

---

Good luck with your demo! 🎉 Show them what developers can build with MCP! 🚀
