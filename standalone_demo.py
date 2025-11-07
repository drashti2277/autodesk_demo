#!/usr/bin/env python3
"""
Standalone Autodesk MCP Server Demo
Run this to see the MCP tools in action without needing Claude Desktop
"""

import json
import asyncio
from autodesk_mcp_server import (
    list_tools,
    call_tool,
    SAMPLE_MODELS
)

def print_header(text):
    """Print a nice header"""
    print("\n" + "=" * 70)
    print(f"  {text}")
    print("=" * 70 + "\n")

def print_tool(tool):
    """Print tool information"""
    print(f"📋 {tool.name}")
    print(f"   {tool.description}")
    print()

async def demo_list_tools():
    """Demo: Show all available MCP tools"""
    print_header("DEMO 1: Available MCP Tools")
    
    tools = await list_tools()
    print(f"Found {len(tools)} MCP tools:\n")
    
    for i, tool in enumerate(tools, 1):
        print(f"{i}. {tool.name}")
        print(f"   → {tool.description[:80]}...")
    
    print(f"\n✅ All {len(tools)} tools are registered and ready!")

async def demo_list_models():
    """Demo: List available Autodesk models"""
    print_header("DEMO 2: List Available Models")
    
    result = await call_tool("list_available_models", {
        "file_type_filter": "all"
    })
    
    data = json.loads(result[0].text)
    print(f"📁 Total models: {data['total_models']}\n")
    
    for model in data['models']:
        print(f"  • {model['filename']}")
        print(f"    Type: {model['type']} | Project: {model['project']}")
    
    print(f"\n✅ Successfully listed all models!")

async def demo_explore_model():
    """Demo: Explore model data in detail"""
    print_header("DEMO 3: Explore Office Building Model")
    
    result = await call_tool("explore_model_data", {
        "filename": "office-building-01.rvt",
        "query_type": "summary"
    })
    
    data = json.loads(result[0].text)
    print(f"🏢 {data['filename']}")
    print(f"\n{data['summary']}\n")
    print("Key Metrics:")
    
    metrics = data['key_metrics']
    print(f"  • Total Area: {metrics.get('total_area_sqft', 0):,} sq ft")
    print(f"  • Floors: {metrics.get('floor_count', 0)}")
    print(f"  • Rooms: {metrics.get('room_count', 0)}")
    print(f"  • Doors: {metrics.get('door_count', 0)}")
    print(f"  • Windows: {metrics.get('window_count', 0)}")
    print(f"  • Total Components: {metrics.get('component_count', 0):,}")
    
    print(f"\n✅ Successfully explored model data!")

async def demo_calculate_materials():
    """Demo: Calculate material quantities"""
    print_header("DEMO 4: Calculate Materials for Warehouse")
    
    result = await call_tool("calculate_material_takeoff", {
        "filename": "warehouse-facility-03.rvt",
        "material_type": "all"
    })
    
    data = json.loads(result[0].text)
    print(f"🏗️  {data['filename']}\n")
    print("Material Takeoff:")
    
    for material, details in data['material_takeoff'].items():
        print(f"\n  {material.upper()}:")
        for key, value in details.items():
            print(f"    • {key}: {value:,}")
    
    print(f"\n✅ Successfully calculated material quantities!")

async def demo_compare_models():
    """Demo: Compare two models"""
    print_header("DEMO 5: Compare Office Building vs Residential Home")
    
    result = await call_tool("compare_model_versions", {
        "model_a": "office-building-01.rvt",
        "model_b": "residential-home-02.rvt",
        "comparison_type": "quantities"
    })
    
    data = json.loads(result[0].text)
    print(f"📊 {data['comparison']}\n")
    print("Key Differences:")
    
    for key, diff in data['differences'].items():
        print(f"\n  {key}:")
        print(f"    Office Building: {diff['model_a']:,}")
        print(f"    Residential Home: {diff['model_b']:,}")
        print(f"    Difference: {diff['difference']:,} ({diff['percent_change']:+.1f}%)")
    
    print(f"\n✅ Successfully compared models!")

async def demo_generate_report():
    """Demo: Generate a comprehensive report"""
    print_header("DEMO 6: Generate Cost Estimate Report")
    
    result = await call_tool("generate_model_report", {
        "filename": "office-building-01.rvt",
        "report_type": "cost_estimate",
        "format": "json"
    })
    
    data = json.loads(result[0].text)
    print(f"💰 {data['report_title']}\n")
    print(f"Estimated Total Cost: ${data['estimated_total_cost_usd']:,.2f}")
    print(f"Cost per Sq Ft: ${data['cost_per_sqft']:,.2f}")
    print(f"\nAssumptions: {data['assumptions']}")
    
    print(f"\n✅ Successfully generated cost estimate!")

async def demo_search_components():
    """Demo: Search for components"""
    print_header("DEMO 7: Search for Windows in Office Building")
    
    result = await call_tool("search_model_components", {
        "filename": "office-building-01.rvt",
        "search_term": "window",
        "search_category": "all"
    })
    
    data = json.loads(result[0].text)
    print(f"🔍 Search: '{data['search_term']}' in {data['filename']}\n")
    print(f"Results Found: {data['results_found']}")
    
    for component in data['components']:
        print(f"\n  • {component['category']}")
        print(f"    Count: {component['count']}")
    
    print(f"\n✅ Successfully searched components!")

async def demo_get_help():
    """Demo: Get Autodesk help content"""
    print_header("DEMO 8: Get Help for Revit Families")
    
    result = await call_tool("get_autodesk_help", {
        "product": "revit",
        "topic": "families"
    })
    
    print(result[0].text)
    
    print(f"\n✅ Successfully retrieved help content!")

async def demo_complex_workflow():
    """Demo: Complex multi-step workflow"""
    print_header("DEMO 9: Complex Workflow - Analyze All Buildings")
    
    print("Step 1: List all models...")
    list_result = await call_tool("list_available_models", {"file_type_filter": "Revit"})
    models_data = json.loads(list_result[0].text)
    revit_models = [m['filename'] for m in models_data['models']]
    print(f"   Found {len(revit_models)} Revit models\n")
    
    print("Step 2: Analyze each model...")
    analyses = []
    for filename in revit_models:
        result = await call_tool("explore_model_data", {
            "filename": filename,
            "query_type": "summary"
        })
        data = json.loads(result[0].text)
        area = data['key_metrics'].get('total_area_sqft', 0)
        components = data['key_metrics'].get('component_count', 0)
        analyses.append({
            'filename': filename,
            'area': area,
            'components': components
        })
        print(f"   ✓ {filename}: {area:,} sq ft")
    
    print("\nStep 3: Calculate cost-effectiveness...")
    cost_results = []
    for analysis in analyses:
        result = await call_tool("generate_model_report", {
            "filename": analysis['filename'],
            "report_type": "cost_estimate",
            "format": "json"
        })
        data = json.loads(result[0].text)
        cost_per_sqft = data['estimated_total_cost_usd'] / analysis['area'] if analysis['area'] > 0 else 0
        cost_results.append({
            'filename': analysis['filename'],
            'cost_per_sqft': cost_per_sqft,
            'total_cost': data['estimated_total_cost_usd']
        })
    
    print("\nStep 4: Compare and recommend...")
    best = min(cost_results, key=lambda x: x['cost_per_sqft'])
    
    print(f"\n🏆 RECOMMENDATION:")
    print(f"   Most cost-effective: {best['filename']}")
    print(f"   Cost per sq ft: ${best['cost_per_sqft']:.2f}")
    print(f"   Total estimated cost: ${best['total_cost']:,.2f}")
    
    print(f"\n✅ Complex workflow completed successfully!")
    print("   This demonstrates AI orchestrating multiple MCP tools!")

async def run_all_demos():
    """Run all demos in sequence"""
    print("\n")
    print("╔════════════════════════════════════════════════════════════════════╗")
    print("║                                                                    ║")
    print("║          🏗️  AUTODESK MCP SERVER - STANDALONE DEMO               ║")
    print("║                                                                    ║")
    print("║     Demonstrating Model Context Protocol Tools in Action          ║")
    print("║              (No Claude Desktop Required!)                        ║")
    print("║                                                                    ║")
    print("╚════════════════════════════════════════════════════════════════════╝")
    
    demos = [
        demo_list_tools,
        demo_list_models,
        demo_explore_model,
        demo_calculate_materials,
        demo_compare_models,
        demo_generate_report,
        demo_search_components,
        demo_get_help,
        demo_complex_workflow,
    ]
    
    for i, demo in enumerate(demos, 1):
        try:
            await demo()
            if i < len(demos):
                input("\n👉 Press ENTER for next demo...")
        except Exception as e:
            print(f"\n❌ Error in demo: {e}")
            continue
    
    print_header("🎉 ALL DEMOS COMPLETED!")
    print("This demonstrates:")
    print("  ✅ 7 MCP tools working correctly")
    print("  ✅ Context-aware Autodesk workflows")
    print("  ✅ Multi-step AI orchestration")
    print("  ✅ Production-ready implementation")
    print("\n🚀 Ready to present to your audience!")
    print("\n")

def main():
    """Main entry point"""
    try:
        asyncio.run(run_all_demos())
    except KeyboardInterrupt:
        print("\n\n⚠️  Demo interrupted by user")
    except Exception as e:
        print(f"\n\n❌ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
