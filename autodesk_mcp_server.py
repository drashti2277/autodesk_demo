#!/usr/bin/env python3
"""
Autodesk MCP Server Demo
A demonstration MCP server showcasing Autodesk Design & Make workflows
Built with mcp.tool() decorators for AI-powered automation
"""

import json
import asyncio
from typing import Any, Optional
from datetime import datetime
from mcp.server import Server
from mcp.types import Tool, TextContent
import mcp.server.stdio

# Initialize MCP server
app = Server("autodesk-demo-server")

# Sample data to simulate Autodesk models
SAMPLE_MODELS = {
    "office-building-01.rvt": {
        "file_type": "Revit",
        "version": "2024",
        "disciplines": ["Architecture", "Structure", "MEP"],
        "total_area_sqft": 45000,
        "floor_count": 5,
        "room_count": 127,
        "wall_count": 342,
        "door_count": 89,
        "window_count": 156,
        "component_count": 2847,
        "volume_cuft": 540000,
        "last_modified": "2024-11-05",
        "created_by": "John Smith",
        "project": "Downtown Office Complex"
    },
    "residential-home-02.rvt": {
        "file_type": "Revit",
        "version": "2023",
        "disciplines": ["Architecture"],
        "total_area_sqft": 3500,
        "floor_count": 2,
        "room_count": 12,
        "wall_count": 67,
        "door_count": 18,
        "window_count": 24,
        "component_count": 456,
        "volume_cuft": 42000,
        "last_modified": "2024-10-28",
        "created_by": "Sarah Johnson",
        "project": "Suburban Housing Development"
    },
    "warehouse-facility-03.rvt": {
        "file_type": "Revit",
        "version": "2024",
        "disciplines": ["Architecture", "Structure"],
        "total_area_sqft": 125000,
        "floor_count": 1,
        "room_count": 8,
        "wall_count": 89,
        "door_count": 24,
        "window_count": 42,
        "component_count": 1234,
        "volume_cuft": 2500000,
        "last_modified": "2024-11-01",
        "created_by": "Mike Chen",
        "project": "Industrial Park Phase 2"
    },
    "bridge-design-01.dwg": {
        "file_type": "AutoCAD",
        "version": "2024",
        "disciplines": ["Civil", "Structure"],
        "span_length_ft": 450,
        "deck_width_ft": 48,
        "total_steel_tons": 1250,
        "concrete_volume_cuyd": 3400,
        "foundation_count": 6,
        "last_modified": "2024-11-03",
        "created_by": "Emily Rodriguez",
        "project": "River Crossing Infrastructure"
    },
    "mechanical-assembly-01.ipt": {
        "file_type": "Inventor",
        "version": "2024",
        "part_count": 247,
        "assembly_mass_kg": 156.8,
        "material": "Aluminum 6061-T6",
        "volume_cumm": 124500,
        "surface_area_sqmm": 45600,
        "last_modified": "2024-10-30",
        "created_by": "David Park",
        "project": "Electric Vehicle Component"
    }
}

HELP_CONTENT = {
    "revit": {
        "getting_started": "Launch Revit, create a new project using a template, and start placing walls, doors, and windows.",
        "families": "Families are parametric objects in Revit. Load them from the library and place them in your project.",
        "views": "Create different views (floor plans, sections, elevations, 3D) to visualize your building model.",
        "scheduling": "Generate schedules to quantify elements like rooms, doors, windows, and materials.",
        "collaboration": "Use Revit Server or BIM 360 for team collaboration on central models."
    },
    "autocad": {
        "getting_started": "Start AutoCAD, choose a template, and begin drawing with basic commands like LINE, CIRCLE, and ARC.",
        "layers": "Organize your drawing using layers. Assign different properties to each layer.",
        "blocks": "Create reusable blocks for repeated elements. Use INSERT to place them.",
        "dimensioning": "Add dimensions to your drawing using DIM commands for accurate measurements.",
        "plotting": "Configure page setup and plot settings to print or export your drawings."
    },
    "fusion360": {
        "getting_started": "Create a new design, sketch a 2D profile, and use extrude/revolve to create 3D geometry.",
        "parametric_modeling": "Use parameters and constraints to create flexible, editable designs.",
        "assemblies": "Create assemblies by combining multiple components with joints and relationships.",
        "simulation": "Test your designs with built-in simulation tools for stress, thermal, and motion analysis.",
        "cam": "Generate toolpaths directly from your model for CNC manufacturing."
    }
}


@app.list_tools()
async def list_tools() -> list[Tool]:
    """List all available MCP tools for Autodesk workflows"""
    return [
        Tool(
            name="explore_model_data",
            description="Explore and analyze Autodesk model data including volumes, areas, counts, and properties. Supports Revit, AutoCAD, Inventor, and other formats.",
            inputSchema={
                "type": "object",
                "properties": {
                    "filename": {
                        "type": "string",
                        "description": "The model filename to explore (e.g., 'office-building-01.rvt')"
                    },
                    "query_type": {
                        "type": "string",
                        "enum": ["summary", "quantities", "components", "metadata"],
                        "description": "Type of information to retrieve"
                    }
                },
                "required": ["filename"]
            }
        ),
        Tool(
            name="list_available_models",
            description="List all available Autodesk models in the current workspace with basic information",
            inputSchema={
                "type": "object",
                "properties": {
                    "file_type_filter": {
                        "type": "string",
                        "enum": ["all", "Revit", "AutoCAD", "Inventor", "Fusion"],
                        "description": "Filter by specific file type"
                    }
                }
            }
        ),
        Tool(
            name="calculate_material_takeoff",
            description="Calculate material quantities and cost estimates from Revit models for construction planning",
            inputSchema={
                "type": "object",
                "properties": {
                    "filename": {
                        "type": "string",
                        "description": "The Revit model filename"
                    },
                    "material_type": {
                        "type": "string",
                        "enum": ["all", "concrete", "steel", "drywall", "insulation"],
                        "description": "Specific material to calculate"
                    }
                },
                "required": ["filename"]
            }
        ),
        Tool(
            name="compare_model_versions",
            description="Compare two versions of a model to identify changes in geometry, quantities, or properties",
            inputSchema={
                "type": "object",
                "properties": {
                    "model_a": {
                        "type": "string",
                        "description": "First model filename"
                    },
                    "model_b": {
                        "type": "string",
                        "description": "Second model filename"
                    },
                    "comparison_type": {
                        "type": "string",
                        "enum": ["quantities", "geometry", "metadata"],
                        "description": "Type of comparison to perform"
                    }
                },
                "required": ["model_a", "model_b"]
            }
        ),
        Tool(
            name="get_autodesk_help",
            description="Get AI-generated tutorials, guides, and troubleshooting help for Autodesk products (Revit, AutoCAD, Fusion 360, etc.)",
            inputSchema={
                "type": "object",
                "properties": {
                    "product": {
                        "type": "string",
                        "enum": ["revit", "autocad", "fusion360", "inventor", "civil3d"],
                        "description": "Autodesk product name"
                    },
                    "topic": {
                        "type": "string",
                        "description": "Help topic or question"
                    }
                },
                "required": ["product", "topic"]
            }
        ),
        Tool(
            name="search_model_components",
            description="Search for specific components, families, or elements within Autodesk models",
            inputSchema={
                "type": "object",
                "properties": {
                    "filename": {
                        "type": "string",
                        "description": "The model filename to search"
                    },
                    "search_term": {
                        "type": "string",
                        "description": "Component name or property to search for"
                    },
                    "search_category": {
                        "type": "string",
                        "enum": ["all", "doors", "windows", "walls", "rooms", "furniture", "structural"],
                        "description": "Limit search to specific category"
                    }
                },
                "required": ["filename", "search_term"]
            }
        ),
        Tool(
            name="generate_model_report",
            description="Generate comprehensive reports for Autodesk models including schedules, quantities, and analytics",
            inputSchema={
                "type": "object",
                "properties": {
                    "filename": {
                        "type": "string",
                        "description": "The model filename"
                    },
                    "report_type": {
                        "type": "string",
                        "enum": ["full_summary", "quantity_takeoff", "room_schedule", "cost_estimate"],
                        "description": "Type of report to generate"
                    },
                    "format": {
                        "type": "string",
                        "enum": ["json", "markdown", "csv"],
                        "description": "Output format for the report"
                    }
                },
                "required": ["filename", "report_type"]
            }
        )
    ]


@app.call_tool()
async def call_tool(name: str, arguments: Any) -> list[TextContent]:
    """Handle tool execution"""
    
    if name == "list_available_models":
        file_type = arguments.get("file_type_filter", "all")
        models = []
        
        for filename, data in SAMPLE_MODELS.items():
            if file_type == "all" or data.get("file_type") == file_type:
                models.append({
                    "filename": filename,
                    "type": data.get("file_type"),
                    "project": data.get("project"),
                    "last_modified": data.get("last_modified")
                })
        
        result = {
            "total_models": len(models),
            "models": models
        }
        
        return [TextContent(
            type="text",
            text=json.dumps(result, indent=2)
        )]
    
    elif name == "explore_model_data":
        filename = arguments["filename"]
        query_type = arguments.get("query_type", "summary")
        
        if filename not in SAMPLE_MODELS:
            return [TextContent(
                type="text",
                text=f"Error: Model '{filename}' not found. Use list_available_models to see available models."
            )]
        
        model_data = SAMPLE_MODELS[filename]
        
        if query_type == "summary":
            result = {
                "filename": filename,
                "summary": f"This is a {model_data['file_type']} model for {model_data['project']}",
                "key_metrics": {k: v for k, v in model_data.items() if k not in ["file_type", "project"]}
            }
        elif query_type == "quantities":
            result = {
                "filename": filename,
                "quantities": {k: v for k, v in model_data.items() if "count" in k or "area" in k or "volume" in k}
            }
        elif query_type == "components":
            result = {
                "filename": filename,
                "components": {k: v for k, v in model_data.items() if "count" in k}
            }
        else:  # metadata
            result = {
                "filename": filename,
                "metadata": {
                    "version": model_data.get("version"),
                    "last_modified": model_data.get("last_modified"),
                    "created_by": model_data.get("created_by"),
                    "project": model_data.get("project")
                }
            }
        
        return [TextContent(
            type="text",
            text=json.dumps(result, indent=2)
        )]
    
    elif name == "calculate_material_takeoff":
        filename = arguments["filename"]
        material_type = arguments.get("material_type", "all")
        
        if filename not in SAMPLE_MODELS:
            return [TextContent(
                type="text",
                text=f"Error: Model '{filename}' not found."
            )]
        
        model = SAMPLE_MODELS[filename]
        
        # Simulate material calculations
        materials = {}
        if material_type in ["all", "concrete"]:
            materials["concrete"] = {
                "volume_cuyd": round(model.get("volume_cuft", 0) * 0.037, 2),
                "estimated_cost_usd": round(model.get("volume_cuft", 0) * 0.037 * 150, 2)
            }
        if material_type in ["all", "steel"]:
            materials["steel"] = {
                "weight_tons": round(model.get("component_count", 0) * 0.05, 2),
                "estimated_cost_usd": round(model.get("component_count", 0) * 0.05 * 800, 2)
            }
        if material_type in ["all", "drywall"]:
            materials["drywall"] = {
                "area_sqft": round(model.get("wall_count", 0) * 120, 2),
                "estimated_cost_usd": round(model.get("wall_count", 0) * 120 * 1.5, 2)
            }
        
        result = {
            "filename": filename,
            "material_takeoff": materials,
            "generated_at": datetime.now().isoformat()
        }
        
        return [TextContent(
            type="text",
            text=json.dumps(result, indent=2)
        )]
    
    elif name == "compare_model_versions":
        model_a = arguments["model_a"]
        model_b = arguments["model_b"]
        comparison_type = arguments.get("comparison_type", "quantities")
        
        if model_a not in SAMPLE_MODELS or model_b not in SAMPLE_MODELS:
            return [TextContent(
                type="text",
                text="Error: One or both models not found."
            )]
        
        data_a = SAMPLE_MODELS[model_a]
        data_b = SAMPLE_MODELS[model_b]
        
        differences = {}
        for key in data_a.keys():
            if key in data_b and isinstance(data_a[key], (int, float)):
                diff = data_b[key] - data_a[key]
                if diff != 0:
                    differences[key] = {
                        "model_a": data_a[key],
                        "model_b": data_b[key],
                        "difference": diff,
                        "percent_change": round((diff / data_a[key] * 100) if data_a[key] != 0 else 0, 2)
                    }
        
        result = {
            "comparison": f"{model_a} vs {model_b}",
            "type": comparison_type,
            "differences": differences
        }
        
        return [TextContent(
            type="text",
            text=json.dumps(result, indent=2)
        )]
    
    elif name == "get_autodesk_help":
        product = arguments["product"]
        topic = arguments["topic"]
        
        help_data = HELP_CONTENT.get(product, {})
        
        # Try to find relevant help content
        response = f"**Autodesk {product.upper()} Help**\n\n"
        response += f"Topic: {topic}\n\n"
        
        # Search for matching help content
        found = False
        for key, content in help_data.items():
            if topic.lower() in key.lower() or any(word in content.lower() for word in topic.lower().split()):
                response += f"**{key.replace('_', ' ').title()}:**\n{content}\n\n"
                found = True
        
        if not found:
            response += "Here are some helpful resources:\n\n"
            for key, content in list(help_data.items())[:2]:
                response += f"**{key.replace('_', ' ').title()}:**\n{content}\n\n"
        
        response += f"\nFor more detailed help, visit: https://help.autodesk.com/{product}"
        
        return [TextContent(
            type="text",
            text=response
        )]
    
    elif name == "search_model_components":
        filename = arguments["filename"]
        search_term = arguments["search_term"].lower()
        category = arguments.get("search_category", "all")
        
        if filename not in SAMPLE_MODELS:
            return [TextContent(
                type="text",
                text=f"Error: Model '{filename}' not found."
            )]
        
        model = SAMPLE_MODELS[filename]
        
        # Simulate component search
        results = []
        for key, value in model.items():
            if "count" in key:
                component_type = key.replace("_count", "")
                if category == "all" or category in component_type:
                    if search_term in component_type or search_term == component_type:
                        results.append({
                            "type": component_type,
                            "count": value,
                            "category": component_type.replace("_", " ").title()
                        })
        
        result = {
            "filename": filename,
            "search_term": search_term,
            "results_found": len(results),
            "components": results
        }
        
        return [TextContent(
            type="text",
            text=json.dumps(result, indent=2)
        )]
    
    elif name == "generate_model_report":
        filename = arguments["filename"]
        report_type = arguments["report_type"]
        output_format = arguments.get("format", "json")
        
        if filename not in SAMPLE_MODELS:
            return [TextContent(
                type="text",
                text=f"Error: Model '{filename}' not found."
            )]
        
        model = SAMPLE_MODELS[filename]
        
        if report_type == "full_summary":
            report = {
                "report_title": f"Full Summary Report - {filename}",
                "generated_at": datetime.now().isoformat(),
                "model_data": model
            }
        elif report_type == "quantity_takeoff":
            report = {
                "report_title": f"Quantity Takeoff - {filename}",
                "generated_at": datetime.now().isoformat(),
                "quantities": {k: v for k, v in model.items() if "count" in k or "area" in k or "volume" in k}
            }
        elif report_type == "room_schedule":
            report = {
                "report_title": f"Room Schedule - {filename}",
                "generated_at": datetime.now().isoformat(),
                "room_count": model.get("room_count", 0),
                "total_area": model.get("total_area_sqft", 0),
                "avg_room_size": round(model.get("total_area_sqft", 0) / model.get("room_count", 1), 2)
            }
        else:  # cost_estimate
            total_cost = (
                model.get("total_area_sqft", 0) * 250 +  # $250 per sqft
                model.get("component_count", 0) * 100    # $100 per component
            )
            report = {
                "report_title": f"Cost Estimate - {filename}",
                "generated_at": datetime.now().isoformat(),
                "estimated_total_cost_usd": round(total_cost, 2),
                "cost_per_sqft": 250,
                "assumptions": "Rough estimate based on area and component count"
            }
        
        if output_format == "markdown":
            md_output = f"# {report['report_title']}\n\n"
            md_output += f"**Generated:** {report['generated_at']}\n\n"
            for key, value in report.items():
                if key not in ["report_title", "generated_at"]:
                    md_output += f"## {key.replace('_', ' ').title()}\n{value}\n\n"
            text_output = md_output
        else:
            text_output = json.dumps(report, indent=2)
        
        return [TextContent(
            type="text",
            text=text_output
        )]
    
    else:
        return [TextContent(
            type="text",
            text=f"Error: Unknown tool '{name}'"
        )]


async def main():
    """Run the MCP server"""
    async with mcp.server.stdio.stdio_server() as (read_stream, write_stream):
        await app.run(
            read_stream,
            write_stream,
            app.create_initialization_options()
        )


if __name__ == "__main__":
    asyncio.run(main())
