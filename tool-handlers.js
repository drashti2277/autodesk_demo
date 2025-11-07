/**
 * MCP Tool handlers for standalone demo
 */

import { SAMPLE_MODELS, HELP_CONTENT } from "./sample-data.js";

export function listTools() {
  return [
    {
      name: "list_available_models",
      description: "List all available Autodesk models in the current workspace with basic information",
    },
    {
      name: "explore_model_data",
      description: "Explore and analyze Autodesk model data including volumes, areas, counts, and properties",
    },
    {
      name: "calculate_material_takeoff",
      description: "Calculate material quantities and cost estimates from Revit models for construction planning",
    },
    {
      name: "compare_model_versions",
      description: "Compare two versions of a model to identify changes in geometry, quantities, or properties",
    },
    {
      name: "search_model_components",
      description: "Search for specific components, families, or elements within Autodesk models",
    },
    {
      name: "generate_model_report",
      description: "Generate comprehensive reports for Autodesk models including schedules, quantities, and analytics",
    },
    {
      name: "get_autodesk_help",
      description: "Get AI-generated tutorials, guides, and troubleshooting help for Autodesk products",
    },
  ];
}

export async function callTool(name, args) {
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
              text: `Error: Model '${filename}' not found.`,
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
          if (key.includes("count") || key.includes("area") || key.includes("volume")) {
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
          content: [{ type: "text", text: `Error: Model '${filename}' not found.` }],
        };
      }

      const model = SAMPLE_MODELS[filename];
      const materials = {};

      if (material_type === "all" || material_type === "concrete") {
        materials.concrete = {
          volume_cuyd: Math.round((model.volume_cuft || 0) * 0.037 * 100) / 100,
          estimated_cost_usd: Math.round((model.volume_cuft || 0) * 0.037 * 150 * 100) / 100,
        };
      }
      if (material_type === "all" || material_type === "steel") {
        materials.steel = {
          weight_tons: Math.round((model.component_count || 0) * 0.05 * 100) / 100,
          estimated_cost_usd: Math.round((model.component_count || 0) * 0.05 * 800 * 100) / 100,
        };
      }
      if (material_type === "all" || material_type === "drywall") {
        materials.drywall = {
          area_sqft: Math.round((model.wall_count || 0) * 120 * 100) / 100,
          estimated_cost_usd: Math.round((model.wall_count || 0) * 120 * 1.5 * 100) / 100,
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
          content: [{ type: "text", text: "Error: One or both models not found." }],
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
              percent_change: Math.round((diff / dataA[key]) * 100 * 100) / 100 || 0,
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
          content: [{ type: "text", text: `Error: Model '${filename}' not found.` }],
        };
      }

      const model = SAMPLE_MODELS[filename];
      const results = [];
      const searchLower = search_term.toLowerCase();

      for (const [key, value] of Object.entries(model)) {
        if (key.includes("count")) {
          const componentType = key.replace("_count", "");
          if (search_category === "all" || search_category.includes(componentType)) {
            if (componentType.includes(searchLower) || searchLower === componentType) {
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
          content: [{ type: "text", text: `Error: Model '${filename}' not found.` }],
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
          if (key.includes("count") || key.includes("area") || key.includes("volume")) {
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
          avg_room_size: Math.round(((model.total_area_sqft || 0) / (model.room_count || 1)) * 100) / 100,
        };
      } else {
        const totalCost = (model.total_area_sqft || 0) * 250 + (model.component_count || 0) * 100;
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
        content: [{ type: "text", text: textOutput }],
      };
    }

    case "get_autodesk_help": {
      const { product, topic } = args;
      const helpData = HELP_CONTENT[product] || {};

      let response = `**Autodesk ${product.toUpperCase()} Help**\n\n`;
      response += `Topic: ${topic}\n\n`;

      let found = false;
      for (const [key, content] of Object.entries(helpData)) {
        if (key.toLowerCase().includes(topic.toLowerCase()) || content.toLowerCase().includes(topic.toLowerCase())) {
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
        content: [{ type: "text", text: response }],
      };
    }

    default:
      return {
        content: [{ type: "text", text: `Error: Unknown tool '${name}'` }],
      };
  }
}
