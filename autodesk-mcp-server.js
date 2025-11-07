#!/usr/bin/env node

/**
 * Autodesk MCP Server Demo
 * A demonstration MCP server showcasing Autodesk Design & Make workflows
 * Built with MCP SDK for JavaScript/Node.js
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Sample data to simulate Autodesk models
const SAMPLE_MODELS = {
  "office-building-01.rvt": {
    file_type: "Revit",
    version: "2024",
    disciplines: ["Architecture", "Structure", "MEP"],
    total_area_sqft: 45000,
    floor_count: 5,
    room_count: 127,
    wall_count: 342,
    door_count: 89,
    window_count: 156,
    component_count: 2847,
    volume_cuft: 540000,
    last_modified: "2024-11-05",
    created_by: "John Smith",
    project: "Downtown Office Complex",
  },
  "residential-home-02.rvt": {
    file_type: "Revit",
    version: "2023",
    disciplines: ["Architecture"],
    total_area_sqft: 3500,
    floor_count: 2,
    room_count: 12,
    wall_count: 67,
    door_count: 18,
    window_count: 24,
    component_count: 456,
    volume_cuft: 42000,
    last_modified: "2024-10-28",
    created_by: "Sarah Johnson",
    project: "Suburban Housing Development",
  },
  "warehouse-facility-03.rvt": {
    file_type: "Revit",
    version: "2024",
    disciplines: ["Architecture", "Structure"],
    total_area_sqft: 125000,
    floor_count: 1,
    room_count: 8,
    wall_count: 89,
    door_count: 24,
    window_count: 42,
    component_count: 1234,
    volume_cuft: 2500000,
    last_modified: "2024-11-01",
    created_by: "Mike Chen",
    project: "Industrial Park Phase 2",
  },
  "bridge-design-01.dwg": {
    file_type: "AutoCAD",
    version: "2024",
    disciplines: ["Civil", "Structure"],
    span_length_ft: 450,
    deck_width_ft: 48,
    total_steel_tons: 1250,
    concrete_volume_cuyd: 3400,
    foundation_count: 6,
    last_modified: "2024-11-03",
    created_by: "Emily Rodriguez",
    project: "River Crossing Infrastructure",
  },
  "mechanical-assembly-01.ipt": {
    file_type: "Inventor",
    version: "2024",
    part_count: 247,
    assembly_mass_kg: 156.8,
    material: "Aluminum 6061-T6",
    volume_cumm: 124500,
    surface_area_sqmm: 45600,
    last_modified: "2024-10-30",
    created_by: "David Park",
    project: "Electric Vehicle Component",
  },
};

const HELP_CONTENT = {
  revit: {
    getting_started:
      "Launch Revit, create a new project using a template, and start placing walls, doors, and windows.",
    families:
      "Families are parametric objects in Revit. Load them from the library and place them in your project.",
    views:
      "Create different views (floor plans, sections, elevations, 3D) to visualize your building model.",
    scheduling:
      "Generate schedules to quantify elements like rooms, doors, windows, and materials.",
    collaboration:
      "Use Revit Server or BIM 360 for team collaboration on central models.",
  },
  autocad: {
    getting_started:
      "Start AutoCAD, choose a template, and begin drawing with basic commands like LINE, CIRCLE, and ARC.",
    layers:
      "Organize your drawing using layers. Assign different properties to each layer.",
    blocks: "Create reusable blocks for repeated elements. Use INSERT to place them.",
    dimensioning:
      "Add dimensions to your drawing using DIM commands for accurate measurements.",
    plotting:
      "Configure page setup and plot settings to print or export your drawings.",
  },
  fusion360: {
    getting_started:
      "Create a new design, sketch a 2D profile, and use extrude/revolve to create 3D geometry.",
    parametric_modeling:
      "Use parameters and constraints to create flexible, editable designs.",
    assemblies:
      "Create assemblies by combining multiple components with joints and relationships.",
    simulation:
      "Test your designs with built-in simulation tools for stress, thermal, and motion analysis.",
    cam: "Generate toolpaths directly from your model for CNC manufacturing.",
  },
};

// Create MCP server instance
const server = new Server(
  {
    name: "autodesk-demo-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Handle list tools request
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_available_models",
        description:
          "List all available Autodesk models in the current workspace with basic information",
        inputSchema: {
          type: "object",
          properties: {
            file_type_filter: {
              type: "string",
              enum: ["all", "Revit", "AutoCAD", "Inventor", "Fusion"],
              description: "Filter by specific file type",
            },
          },
        },
      },
      {
        name: "explore_model_data",
        description:
          "Explore and analyze Autodesk model data including volumes, areas, counts, and properties. Supports Revit, AutoCAD, Inventor, and other formats.",
        inputSchema: {
          type: "object",
          properties: {
            filename: {
              type: "string",
              description:
                "The model filename to explore (e.g., 'office-building-01.rvt')",
            },
            query_type: {
              type: "string",
              enum: ["summary", "quantities", "components", "metadata"],
              description: "Type of information to retrieve",
            },
          },
          required: ["filename"],
        },
      },
      {
        name: "calculate_material_takeoff",
        description:
          "Calculate material quantities and cost estimates from Revit models for construction planning",
        inputSchema: {
          type: "object",
          properties: {
            filename: {
              type: "string",
              description: "The Revit model filename",
            },
            material_type: {
              type: "string",
              enum: ["all", "concrete", "steel", "drywall", "insulation"],
              description: "Specific material to calculate",
            },
          },
          required: ["filename"],
        },
      },
      {
        name: "compare_model_versions",
        description:
          "Compare two versions of a model to identify changes in geometry, quantities, or properties",
        inputSchema: {
          type: "object",
          properties: {
            model_a: {
              type: "string",
              description: "First model filename",
            },
            model_b: {
              type: "string",
              description: "Second model filename",
            },
            comparison_type: {
              type: "string",
              enum: ["quantities", "geometry", "metadata"],
              description: "Type of comparison to perform",
            },
          },
          required: ["model_a", "model_b"],
        },
      },
      {
        name: "search_model_components",
        description:
          "Search for specific components, families, or elements within Autodesk models",
        inputSchema: {
          type: "object",
          properties: {
            filename: {
              type: "string",
              description: "The model filename to search",
            },
            search_term: {
              type: "string",
              description: "Component name or property to search for",
            },
            search_category: {
              type: "string",
              enum: [
                "all",
                "doors",
                "windows",
                "walls",
                "rooms",
                "furniture",
                "structural",
              ],
              description: "Limit search to specific category",
            },
          },
          required: ["filename", "search_term"],
        },
      },
      {
        name: "generate_model_report",
        description:
          "Generate comprehensive reports for Autodesk models including schedules, quantities, and analytics",
        inputSchema: {
          type: "object",
          properties: {
            filename: {
              type: "string",
              description: "The model filename",
            },
            report_type: {
              type: "string",
              enum: [
                "full_summary",
                "quantity_takeoff",
                "room_schedule",
                "cost_estimate",
              ],
              description: "Type of report to generate",
            },
            format: {
              type: "string",
              enum: ["json", "markdown", "csv"],
              description: "Output format for the report",
            },
          },
          required: ["filename", "report_type"],
        },
      },
      {
        name: "get_autodesk_help",
        description:
          "Get AI-generated tutorials, guides, and troubleshooting help for Autodesk products (Revit, AutoCAD, Fusion 360, etc.)",
        inputSchema: {
          type: "object",
          properties: {
            product: {
              type: "string",
              enum: ["revit", "autocad", "fusion360", "inventor", "civil3d"],
              description: "Autodesk product name",
            },
            topic: {
              type: "string",
              description: "Help topic or question",
            },
          },
          required: ["product", "topic"],
        },
      },
    ],
  };
});

// Handle call tool request
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "list_available_models": {
        const fileType = args.file_type_filter || "all";
        const models = [];

        for (const [filename, data] of Object.entries(SAMPLE_MODELS)) {
          if (fileType === "all" || data.file_type === fileType) {
            models.push({
              filename,
              type: data.file_type,
              project: data.project,
              last_modified: data.last_modified,
            });
          }
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  total_models: models.length,
                  models,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "explore_model_data": {
        const { filename, query_type = "summary" } = args;

        if (!SAMPLE_MODELS[filename]) {
          return {
            content: [
              {
                type: "text",
                text: `Error: Model '${filename}' not found. Use list_available_models to see available models.`,
              },
            ],
          };
        }

        const modelData = SAMPLE_MODELS[filename];
        let result;

        if (query_type === "summary") {
          const { file_type, project, ...metrics } = modelData;
          result = {
            filename,
            summary: `This is a ${file_type} model for ${project}`,
            key_metrics: metrics,
          };
        } else if (query_type === "quantities") {
          const quantities = {};
          for (const [key, value] of Object.entries(modelData)) {
            if (
              key.includes("count") ||
              key.includes("area") ||
              key.includes("volume")
            ) {
              quantities[key] = value;
            }
          }
          result = { filename, quantities };
        } else if (query_type === "components") {
          const components = {};
          for (const [key, value] of Object.entries(modelData)) {
            if (key.includes("count")) {
              components[key] = value;
            }
          }
          result = { filename, components };
        } else {
          result = {
            filename,
            metadata: {
              version: modelData.version,
              last_modified: modelData.last_modified,
              created_by: modelData.created_by,
              project: modelData.project,
            },
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "calculate_material_takeoff": {
        const { filename, material_type = "all" } = args;

        if (!SAMPLE_MODELS[filename]) {
          return {
            content: [
              {
                type: "text",
                text: `Error: Model '${filename}' not found.`,
              },
            ],
          };
        }

        const model = SAMPLE_MODELS[filename];
        const materials = {};

        if (material_type === "all" || material_type === "concrete") {
          materials.concrete = {
            volume_cuyd: Math.round((model.volume_cuft || 0) * 0.037 * 100) / 100,
            estimated_cost_usd:
              Math.round((model.volume_cuft || 0) * 0.037 * 150 * 100) / 100,
          };
        }
        if (material_type === "all" || material_type === "steel") {
          materials.steel = {
            weight_tons: Math.round((model.component_count || 0) * 0.05 * 100) / 100,
            estimated_cost_usd:
              Math.round((model.component_count || 0) * 0.05 * 800 * 100) / 100,
          };
        }
        if (material_type === "all" || material_type === "drywall") {
          materials.drywall = {
            area_sqft: Math.round((model.wall_count || 0) * 120 * 100) / 100,
            estimated_cost_usd:
              Math.round((model.wall_count || 0) * 120 * 1.5 * 100) / 100,
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  filename,
                  material_takeoff: materials,
                  generated_at: new Date().toISOString(),
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "compare_model_versions": {
        const { model_a, model_b, comparison_type = "quantities" } = args;

        if (!SAMPLE_MODELS[model_a] || !SAMPLE_MODELS[model_b]) {
          return {
            content: [
              {
                type: "text",
                text: "Error: One or both models not found.",
              },
            ],
          };
        }

        const dataA = SAMPLE_MODELS[model_a];
        const dataB = SAMPLE_MODELS[model_b];
        const differences = {};

        for (const key of Object.keys(dataA)) {
          if (key in dataB && typeof dataA[key] === "number") {
            const diff = dataB[key] - dataA[key];
            if (diff !== 0) {
              differences[key] = {
                model_a: dataA[key],
                model_b: dataB[key],
                difference: diff,
                percent_change:
                  Math.round((diff / dataA[key]) * 100 * 100) / 100 || 0,
              };
            }
          }
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  comparison: `${model_a} vs ${model_b}`,
                  type: comparison_type,
                  differences,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "search_model_components": {
        const { filename, search_term, search_category = "all" } = args;

        if (!SAMPLE_MODELS[filename]) {
          return {
            content: [
              {
                type: "text",
                text: `Error: Model '${filename}' not found.`,
              },
            ],
          };
        }

        const model = SAMPLE_MODELS[filename];
        const results = [];
        const searchLower = search_term.toLowerCase();

        for (const [key, value] of Object.entries(model)) {
          if (key.includes("count")) {
            const componentType = key.replace("_count", "");
            if (
              search_category === "all" ||
              search_category.includes(componentType)
            ) {
              if (
                componentType.includes(searchLower) ||
                searchLower === componentType
              ) {
                results.push({
                  type: componentType,
                  count: value,
                  category: componentType.replace(/_/g, " ").toUpperCase(),
                });
              }
            }
          }
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  filename,
                  search_term,
                  results_found: results.length,
                  components: results,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "generate_model_report": {
        const { filename, report_type, format = "json" } = args;

        if (!SAMPLE_MODELS[filename]) {
          return {
            content: [
              {
                type: "text",
                text: `Error: Model '${filename}' not found.`,
              },
            ],
          };
        }

        const model = SAMPLE_MODELS[filename];
        let report;

        if (report_type === "full_summary") {
          report = {
            report_title: `Full Summary Report - ${filename}`,
            generated_at: new Date().toISOString(),
            model_data: model,
          };
        } else if (report_type === "quantity_takeoff") {
          const quantities = {};
          for (const [key, value] of Object.entries(model)) {
            if (
              key.includes("count") ||
              key.includes("area") ||
              key.includes("volume")
            ) {
              quantities[key] = value;
            }
          }
          report = {
            report_title: `Quantity Takeoff - ${filename}`,
            generated_at: new Date().toISOString(),
            quantities,
          };
        } else if (report_type === "room_schedule") {
          report = {
            report_title: `Room Schedule - ${filename}`,
            generated_at: new Date().toISOString(),
            room_count: model.room_count || 0,
            total_area: model.total_area_sqft || 0,
            avg_room_size:
              Math.round(
                ((model.total_area_sqft || 0) / (model.room_count || 1)) * 100
              ) / 100,
          };
        } else {
          const totalCost =
            (model.total_area_sqft || 0) * 250 +
            (model.component_count || 0) * 100;
          report = {
            report_title: `Cost Estimate - ${filename}`,
            generated_at: new Date().toISOString(),
            estimated_total_cost_usd: Math.round(totalCost * 100) / 100,
            cost_per_sqft: 250,
            assumptions: "Rough estimate based on area and component count",
          };
        }

        let textOutput;
        if (format === "markdown") {
          textOutput = `# ${report.report_title}\n\n**Generated:** ${report.generated_at}\n\n`;
          for (const [key, value] of Object.entries(report)) {
            if (key !== "report_title" && key !== "generated_at") {
              textOutput += `## ${key.replace(/_/g, " ").toUpperCase()}\n${JSON.stringify(value, null, 2)}\n\n`;
            }
          }
        } else {
          textOutput = JSON.stringify(report, null, 2);
        }

        return {
          content: [
            {
              type: "text",
              text: textOutput,
            },
          ],
        };
      }

      case "get_autodesk_help": {
        const { product, topic } = args;
        const helpData = HELP_CONTENT[product] || {};

        let response = `**Autodesk ${product.toUpperCase()} Help**\n\n`;
        response += `Topic: ${topic}\n\n`;

        let found = false;
        for (const [key, content] of Object.entries(helpData)) {
          if (
            key.toLowerCase().includes(topic.toLowerCase()) ||
            content.toLowerCase().includes(topic.toLowerCase())
          ) {
            response += `**${key.replace(/_/g, " ").toUpperCase()}:**\n${content}\n\n`;
            found = true;
          }
        }

        if (!found) {
          response += "Here are some helpful resources:\n\n";
          const entries = Object.entries(helpData).slice(0, 2);
          for (const [key, content] of entries) {
            response += `**${key.replace(/_/g, " ").toUpperCase()}:**\n${content}\n\n`;
          }
        }

        response += `\nFor more detailed help, visit: https://help.autodesk.com/${product}`;

        return {
          content: [
            {
              type: "text",
              text: response,
            },
          ],
        };
      }

      default:
        return {
          content: [
            {
              type: "text",
              text: `Error: Unknown tool '${name}'`,
            },
          ],
        };
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error executing tool: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Autodesk MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
