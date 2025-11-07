# 🏗️ Autodesk MCP Server - JavaScript Version

## 🚀 Super Quick Start

```bash
npm install
npm run demo
```

That's it! The demo runs automatically.

## 📁 JavaScript Files

```
autodesk-mcp-server.js    ⭐ Main MCP server
standalone-demo.js         ⭐ Standalone demo (no Claude Desktop)
sample-data.js             📊 Sample Autodesk models
tool-handlers.js           🛠️  Tool implementation
package.json               ⚙️  NPM configuration
test-server.js             🧪 Test script
```

## 🎯 Key Features

### Built with MCP SDK
```javascript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";

const server = new Server({
  name: "autodesk-demo-server",
  version: "1.0.0"
});

// Register tool handlers
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: [...] };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  // Handle tool calls
});
```

### 7 MCP Tools
1. `list_available_models` - Browse Autodesk files
2. `explore_model_data` - Analyze model properties
3. `calculate_material_takeoff` - Construction estimates
4. `compare_model_versions` - Compare models
5. `search_model_components` - Find components
6. `generate_model_report` - Create reports
7. `get_autodesk_help` - Help content

## 📦 NPM Scripts

```bash
npm run demo    # Run standalone demo
npm run test    # Run tests
npm start       # Start MCP server (for Claude Desktop)
```

## 🎬 For Your Presentation

### 1. Clone from GitHub
```bash
git clone https://github.com/YOUR_USERNAME/autodesk-mcp-demo.git
cd autodesk-mcp-demo
```

### 2. Install
```bash
npm install
```

### 3. Run Demo
```bash
npm run demo
```

Press ENTER between demos to control pacing.

## 🔧 With Claude Desktop

Add to Claude Desktop config:

```json
{
  "mcpServers": {
    "autodesk-demo": {
      "command": "node",
      "args": ["/full/path/to/autodesk-mcp-server.js"]
    }
  }
}
```

## 💡 Code Highlights

### ES Modules
Uses modern JavaScript with ES modules:
```javascript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SAMPLE_MODELS } from "./sample-data.js";
```

### Async/Await
Clean async patterns:
```javascript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  // Handle tool execution
  return { content: [...] };
});
```

### Type-Safe Schemas
JSON Schema validation:
```javascript
{
  name: "explore_model_data",
  inputSchema: {
    type: "object",
    properties: {
      filename: { type: "string" },
      query_type: { 
        type: "string",
        enum: ["summary", "quantities", "components", "metadata"]
      }
    },
    required: ["filename"]
  }
}
```

## 🎓 What This Demonstrates

✅ **MCP Protocol** - Official SDK implementation  
✅ **Modern JavaScript** - ES modules, async/await  
✅ **Production Patterns** - Error handling, validation  
✅ **Autodesk Workflows** - Real Design & Make use cases  
✅ **No Claude Desktop** - Runs standalone for demos  

## 📊 Sample Models Included

- `office-building-01.rvt` - 45,000 sq ft office
- `residential-home-02.rvt` - 3,500 sq ft home
- `warehouse-facility-03.rvt` - 125,000 sq ft warehouse
- `bridge-design-01.dwg` - Bridge design
- `mechanical-assembly-01.ipt` - 247-part assembly

## 🏆 Why JavaScript?

- ✅ Cross-platform (runs anywhere Node.js runs)
- ✅ Popular in web development
- ✅ Official MCP SDK support
- ✅ Easy to integrate with web apps
- ✅ Large ecosystem (npm)

## 🚀 Next Steps

1. **Extend the tools** - Add more Autodesk workflows
2. **Connect to APIs** - Integrate Autodesk Platform Services
3. **Add web UI** - Build a web interface
4. **Deploy** - Host on AWS/Azure/Vercel
5. **Share** - Publish to npm

## 📚 Resources

- [MCP JavaScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [MCP Specification](https://spec.modelcontextprotocol.io/)
- [Autodesk Platform Services](https://aps.autodesk.com/)

---

**Built with Node.js and ❤️ for the developer community**

Ready to present? Just run `npm run demo`! 🎉
