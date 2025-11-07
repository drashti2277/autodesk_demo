#!/bin/bash
# Quick Start Script for Autodesk MCP Server Demo

echo "🏗️  Autodesk MCP Server Demo - Quick Start"
echo "=========================================="
echo ""

# Check Python version
echo "Checking Python version..."
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version 2>&1 | awk '{print $2}')
    echo "✅ Python $PYTHON_VERSION found"
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_VERSION=$(python --version 2>&1 | awk '{print $2}')
    echo "✅ Python $PYTHON_VERSION found"
    PYTHON_CMD="python"
else
    echo "❌ Python not found. Please install Python 3.10+"
    exit 1
fi

echo ""

# Install MCP SDK
echo "Installing MCP SDK..."
$PYTHON_CMD -m pip install --quiet mcp
if [ $? -eq 0 ]; then
    echo "✅ MCP SDK installed successfully"
else
    echo "❌ Failed to install MCP SDK"
    echo "   Try: $PYTHON_CMD -m pip install mcp"
    exit 1
fi

echo ""

# Run tests
echo "Running tests..."
$PYTHON_CMD test_server.py

echo ""
echo "=========================================="
echo "🎉 Setup Complete!"
echo ""
echo "Next Steps:"
echo "1. Add this to your Claude Desktop config:"
echo ""
echo '   {'
echo '     "mcpServers": {'
echo '       "autodesk-demo": {'
echo '         "command": "'"$PYTHON_CMD"'",'
echo '         "args": ["'"$(pwd)/autodesk_mcp_server.py"'"]'
echo '       }'
echo '     }'
echo '   }'
echo ""
echo "2. Restart Claude Desktop"
echo "3. Try: 'What Autodesk models are available?'"
echo ""
echo "📚 See SETUP_GUIDE.md for detailed instructions"
echo "🎤 See PRESENTATION_NOTES.md for demo tips"
echo ""
