#!/usr/bin/env python3
"""
Quick test script to verify the MCP server works
Run this to check if the server can be initialized
"""

import json
import sys

def test_server_import():
    """Test that the server can be imported"""
    try:
        import autodesk_mcp_server
        print("✅ Server module imported successfully")
        return True
    except Exception as e:
        print(f"❌ Failed to import server: {e}")
        return False

def test_sample_data():
    """Test that sample data is available"""
    try:
        from autodesk_mcp_server import SAMPLE_MODELS
        print(f"✅ Sample data loaded: {len(SAMPLE_MODELS)} models available")
        for filename in SAMPLE_MODELS.keys():
            print(f"   - {filename}")
        return True
    except Exception as e:
        print(f"❌ Failed to load sample data: {e}")
        return False

def test_help_content():
    """Test that help content is available"""
    try:
        from autodesk_mcp_server import HELP_CONTENT
        products = list(HELP_CONTENT.keys())
        print(f"✅ Help content loaded for {len(products)} products: {', '.join(products)}")
        return True
    except Exception as e:
        print(f"❌ Failed to load help content: {e}")
        return False

def test_mcp_dependencies():
    """Test that MCP SDK is installed"""
    try:
        import mcp.server
        import mcp.types
        print("✅ MCP SDK installed and importable")
        return True
    except Exception as e:
        print(f"❌ MCP SDK not available: {e}")
        print("   Run: pip install mcp")
        return False

def main():
    print("=" * 60)
    print("Autodesk MCP Server - Test Suite")
    print("=" * 60)
    print()
    
    tests = [
        ("MCP Dependencies", test_mcp_dependencies),
        ("Server Import", test_server_import),
        ("Sample Data", test_sample_data),
        ("Help Content", test_help_content),
    ]
    
    results = []
    for test_name, test_func in tests:
        print(f"\n🧪 Testing: {test_name}")
        print("-" * 60)
        results.append(test_func())
        print()
    
    print("=" * 60)
    print("Test Summary")
    print("=" * 60)
    passed = sum(results)
    total = len(results)
    print(f"Passed: {passed}/{total}")
    
    if passed == total:
        print("\n🎉 All tests passed! Server is ready to use.")
        print("\nNext steps:")
        print("1. Add the server to your Claude Desktop config")
        print("2. Restart Claude Desktop")
        print("3. Try asking: 'What Autodesk models do I have?'")
        return 0
    else:
        print("\n⚠️  Some tests failed. Please fix the issues above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
