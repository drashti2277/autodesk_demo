# 🏗️ Autodesk MCP Server Demo

**Design faster. Build better. Powered by MCP.**

A demonstration Model Context Protocol (MCP) server showcasing Autodesk Design & Make workflows - built by developers, for developers, to show what's possible *today* while we wait for official Autodesk MCP servers.

![MCP](https://img.shields.io/badge/MCP-Compatible-blue)
![Python](https://img.shields.io/badge/Python-3.10+-green)
![Status](https://img.shields.io/badge/Status-Demo-orange)

## 🎯 What This Demonstrates

This MCP server showcases the four key Autodesk MCP server concepts that Autodesk announced as "coming soon":

1. **🔍 Model Data Explorer** - Access, visualize, and explore model data (volumes, areas, counts, etc.)
2. **📐 Revit Workflows** - Automate Revit operations and data extraction
3. **🤝 Fusion Data Management** - Manage projects, search data, and component properties
4. **📚 Autodesk Help** - AI-powered help content and tutorials

Built using `mcp.tool()` decorators and the official MCP Python SDK, this demo proves developers can create production-grade MCP servers for Autodesk workflows right now!

## 🚀 Two Ways to Run This Demo

### Option 1: Standalone Demo (No Claude Desktop Needed!)
Perfect for presentations - just run the demo script:

**JavaScript/Node.js:**
```bash
npm run demo
```

**Python:**
```bash
python standalone_demo.py
```

### Option 2: With Claude Desktop (Full AI Experience)
For interactive AI-powered workflows - see [Setup Guide](#with-claude-desktop) below

## ✨ Key Features

### 🎨 Context-Aware Tools
- Understands Autodesk-specific terminology and workflows
- Smart defaults based on file types and project context
- Situationally appropriate responses for Design and Make use cases

### 🔧 7 Powerful MCP Tools

1. **`list_available_models`** - Browse all available Autodesk models
2. **`explore_model_data`** - Deep dive into model properties, quantities, and metadata
3. **`calculate_material_takeoff`** - Generate construction material estimates
4. **`compare_model_versions`** - Identify changes between model versions
5. **`search_model_components`** - Find specific elements within models
6. **`generate_model_report`** - Create comprehensive reports (JSON, Markdown, CSV)
7. **`get_autodesk_help`** - Access help content for Revit, AutoCAD, Fusion 360, etc.

### 📦 Sample Data Included
- Office building (Revit) - 5 floors, 45,000 sq ft
- Residential home (Revit) - 2 floors, 3,500 sq ft  
- Warehouse facility (Revit) - 125,000 sq ft
- Bridge design (AutoCAD) - Civil/structural
- Mechanical assembly (Inventor) - 247 parts

## 🚀 Quick Start

### Prerequisites
- **JavaScript:** Node.js 18+ OR
- **Python:** Python 3.10+
- Git (for cloning)

### Installation

1. **Clone the repository:**
```bash
git clone YOUR_GITHUB_REPO_URL
cd autodesk-mcp-demo
```

2. **Install dependencies:**

**JavaScript:**
```bash
npm install
```

**Python:**
```bash
pip install -r requirements.txt
```

3. **Run the standalone demo:**

**JavaScript:**
```bash
npm run demo
```

**Python:**
```bash
python standalone_demo.py
```

That's it! 🎉 The demo will walk through all 9 demonstrations.

### With Claude Desktop (Optional)

If you want the full AI-powered experience:

1. **Configure Claude Desktop:**

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "autodesk-demo": {
      "command": "python3",
      "args": ["/full/path/to/autodesk_mcp_server.py"]
    }
  }
}
```

2. **Restart Claude Desktop and try:**

```
"What Autodesk models are available?"
"Analyze the office building"
"Calculate materials for the warehouse"
```

## 💡 Standalone Demo

The `standalone_demo.py` script runs 9 demonstrations:

1. **List Tools** - Show all 7 MCP tools
2. **List Models** - Browse available files
3. **Explore Model** - Analyze office building
4. **Calculate Materials** - Material takeoff for warehouse
5. **Compare Models** - Office vs residential
6. **Generate Report** - Cost estimate
7. **Search Components** - Find windows
8. **Get Help** - Revit help content
9. **Complex Workflow** - Multi-step AI orchestration

Perfect for presentations without needing Claude Desktop!

See [`demo_usage.md`](demo_usage.md) for comprehensive examples and demo scenarios!

## 🏗️ Architecture

### Built with MCP Best Practices

```python
from mcp.server import Server
from mcp.types import Tool, TextContent
import mcp.server.stdio

app = Server("autodesk-demo-server")

@app.list_tools()
async def list_tools() -> list[Tool]:
    """Define available tools"""
    return [Tool(...), Tool(...)]

@app.call_tool()
async def call_tool(name: str, arguments: Any) -> list[TextContent]:
    """Handle tool execution"""
    # Your tool logic here
    return [TextContent(type="text", text=result)]
```

### Enterprise-Ready Patterns

✅ **Proper Error Handling** - Graceful failures with helpful messages  
✅ **Input Validation** - Schema-based validation for all tools  
✅ **Structured Responses** - JSON and Markdown output formats  
✅ **Async/Await** - Production-grade async implementation  
✅ **Type Safety** - Full type hints throughout  

## 🎓 What You'll Learn

This demo teaches:

1. **How to build MCP servers** using the official Python SDK
2. **Using `@app.tool()` decorators** for clean tool definitions
3. **Schema-driven design** with InputSchema validation
4. **Multi-step AI workflows** that combine multiple tools
5. **Domain-specific context** for specialized industries (AEC, manufacturing)
6. **Production patterns** for enterprise-grade MCP servers

## 🎤 Perfect for Presentations

This demo is ideal for:

- **Developer Demos** - Show what MCP enables for Autodesk workflows
- **Technical Presentations** - Explain MCP architecture with working code
- **Innovation Showcases** - Demonstrate developer-led innovation
- **Sales Engineering** - Show AI-powered automation potential
- **Hackathons** - Starting point for AEC/manufacturing AI projects

## 🔮 Future Enhancements

Want to extend this demo? Consider adding:

- [ ] Real Revit API integration (via RevitPythonShell)
- [ ] Autodesk Platform Services (APS) API connections
- [ ] BIM 360 / Autodesk Construction Cloud integration
- [ ] Real file parsing (IFC, RVT, DWG) with libraries
- [ ] 3D visualization endpoints
- [ ] Clash detection and coordination workflows
- [ ] Cost estimation with real material databases
- [ ] Schedule generation and project planning tools

## 📚 Resources

### MCP Resources
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk)
- [MCP Specification](https://spec.modelcontextprotocol.io/)

### Autodesk Resources
- [Autodesk MCP Servers Announcement](https://aps.autodesk.com/)
- [Autodesk Platform Services](https://aps.autodesk.com/)
- [Revit API Documentation](https://www.revitapidocs.com/)

## 🤝 Contributing

This is a demo project, but feel free to:
- Fork it and make it your own
- Add real API integrations
- Create additional tools
- Share improvements back with the community

## ⚠️ Disclaimer

This is a **demonstration/educational project** built by the developer community. It is:
- ✅ Great for learning MCP
- ✅ Perfect for demos and presentations
- ✅ A starting point for real integrations
- ❌ Not affiliated with Autodesk
- ❌ Not using real Autodesk APIs (uses mock data)
- ❌ Not for production use without additional development

For production Autodesk integrations, wait for official Autodesk MCP servers or integrate with [Autodesk Platform Services (APS)](https://aps.autodesk.com/).

## 📄 License

MIT License - Feel free to use this for learning, demos, and as a foundation for your own MCP servers!

---

## 🎉 What Makes This Special

This demo shows how **developers can lead innovation** in the AI + Design & Make space:

🚀 **Speed** - Built before official servers are available  
🛠️ **Flexibility** - Customizable for specific workflows  
🎯 **Practical** - Solves real problems today  
💡 **Inspirational** - Shows what's possible with MCP  

**The future of Design and Make is AI-powered. Start building today!** 🏗️✨

---

Built with ❤️ by the developer community | Powered by [Model Context Protocol](https://modelcontextprotocol.io/)
