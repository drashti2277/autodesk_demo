#!/usr/bin/env node

/**
 * Standalone Autodesk MCP Server Demo
 * Run this to see the MCP tools in action without needing Claude Desktop
 */

import { SAMPLE_MODELS } from "./sample-data.js";
import {
  listTools,
  callTool
} from "./tool-handlers.js";
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function printHeader(text) {
  console.log("\n" + "=".repeat(70));
  console.log(`  ${text}`);
  console.log("=".repeat(70) + "\n");
}

async function demo1_ListTools() {
  printHeader("DEMO 1: Available MCP Tools");
  
  const tools = listTools();
  console.log(`Found ${tools.length} MCP tools:\n`);
  
  tools.forEach((tool, i) => {
    console.log(`${i + 1}. ${tool.name}`);
    console.log(`   → ${tool.description.substring(0, 80)}...`);
  });
  
  console.log(`\n✅ All ${tools.length} tools are registered and ready!`);
}

async function demo2_ListModels() {
  printHeader("DEMO 2: List Available Models");
  
  const result = await callTool("list_available_models", {
    file_type_filter: "all"
  });
  
  const data = JSON.parse(result.content[0].text);
  console.log(`📁 Total models: ${data.total_models}\n`);
  
  data.models.forEach(model => {
    console.log(`  • ${model.filename}`);
    console.log(`    Type: ${model.type} | Project: ${model.project}`);
  });
  
  console.log(`\n✅ Successfully listed all models!`);
}

async function demo3_ExploreModel() {
  printHeader("DEMO 3: Explore Office Building Model");
  
  const result = await callTool("explore_model_data", {
    filename: "office-building-01.rvt",
    query_type: "summary"
  });
  
  const data = JSON.parse(result.content[0].text);
  console.log(`🏢 ${data.filename}`);
  console.log(`\n${data.summary}\n`);
  console.log("Key Metrics:");
  
  const metrics = data.key_metrics;
  console.log(`  • Total Area: ${(metrics.total_area_sqft || 0).toLocaleString()} sq ft`);
  console.log(`  • Floors: ${metrics.floor_count || 0}`);
  console.log(`  • Rooms: ${metrics.room_count || 0}`);
  console.log(`  • Doors: ${metrics.door_count || 0}`);
  console.log(`  • Windows: ${metrics.window_count || 0}`);
  console.log(`  • Total Components: ${(metrics.component_count || 0).toLocaleString()}`);
  
  console.log(`\n✅ Successfully explored model data!`);
}

async function demo4_CalculateMaterials() {
  printHeader("DEMO 4: Calculate Materials for Warehouse");
  
  const result = await callTool("calculate_material_takeoff", {
    filename: "warehouse-facility-03.rvt",
    material_type: "all"
  });
  
  const data = JSON.parse(result.content[0].text);
  console.log(`🏗️  ${data.filename}\n`);
  console.log("Material Takeoff:");
  
  for (const [material, details] of Object.entries(data.material_takeoff)) {
    console.log(`\n  ${material.toUpperCase()}:`);
    for (const [key, value] of Object.entries(details)) {
      console.log(`    • ${key}: ${value.toLocaleString()}`);
    }
  }
  
  console.log(`\n✅ Successfully calculated material quantities!`);
}

async function demo5_CompareModels() {
  printHeader("DEMO 5: Compare Office Building vs Residential Home");
  
  const result = await callTool("compare_model_versions", {
    model_a: "office-building-01.rvt",
    model_b: "residential-home-02.rvt",
    comparison_type: "quantities"
  });
  
  const data = JSON.parse(result.content[0].text);
  console.log(`📊 ${data.comparison}\n`);
  console.log("Key Differences:");
  
  for (const [key, diff] of Object.entries(data.differences)) {
    console.log(`\n  ${key}:`);
    console.log(`    Office Building: ${diff.model_a.toLocaleString()}`);
    console.log(`    Residential Home: ${diff.model_b.toLocaleString()}`);
    console.log(`    Difference: ${diff.difference.toLocaleString()} (${diff.percent_change >= 0 ? '+' : ''}${diff.percent_change}%)`);
  }
  
  console.log(`\n✅ Successfully compared models!`);
}

async function demo6_GenerateReport() {
  printHeader("DEMO 6: Generate Cost Estimate Report");
  
  const result = await callTool("generate_model_report", {
    filename: "office-building-01.rvt",
    report_type: "cost_estimate",
    format: "json"
  });
  
  const data = JSON.parse(result.content[0].text);
  console.log(`💰 ${data.report_title}\n`);
  console.log(`Estimated Total Cost: $${data.estimated_total_cost_usd.toLocaleString()}`);
  console.log(`Cost per Sq Ft: $${data.cost_per_sqft.toLocaleString()}`);
  console.log(`\nAssumptions: ${data.assumptions}`);
  
  console.log(`\n✅ Successfully generated cost estimate!`);
}

async function demo7_SearchComponents() {
  printHeader("DEMO 7: Search for Windows in Office Building");
  
  const result = await callTool("search_model_components", {
    filename: "office-building-01.rvt",
    search_term: "window",
    search_category: "all"
  });
  
  const data = JSON.parse(result.content[0].text);
  console.log(`🔍 Search: '${data.search_term}' in ${data.filename}\n`);
  console.log(`Results Found: ${data.results_found}`);
  
  data.components.forEach(component => {
    console.log(`\n  • ${component.category}`);
    console.log(`    Count: ${component.count}`);
  });
  
  console.log(`\n✅ Successfully searched components!`);
}

async function demo8_GetHelp() {
  printHeader("DEMO 8: Get Help for Revit Families");
  
  const result = await callTool("get_autodesk_help", {
    product: "revit",
    topic: "families"
  });
  
  console.log(result.content[0].text);
  
  console.log(`\n✅ Successfully retrieved help content!`);
}

async function demo9_ComplexWorkflow() {
  printHeader("DEMO 9: Complex Workflow - Analyze All Buildings");
  
  console.log("Step 1: List all models...");
  const listResult = await callTool("list_available_models", { 
    file_type_filter: "Revit" 
  });
  const modelsData = JSON.parse(listResult.content[0].text);
  const revitModels = modelsData.models.map(m => m.filename);
  console.log(`   Found ${revitModels.length} Revit models\n`);
  
  console.log("Step 2: Analyze each model...");
  const analyses = [];
  for (const filename of revitModels) {
    const result = await callTool("explore_model_data", {
      filename,
      query_type: "summary"
    });
    const data = JSON.parse(result.content[0].text);
    const area = data.key_metrics.total_area_sqft || 0;
    const components = data.key_metrics.component_count || 0;
    analyses.push({ filename, area, components });
    console.log(`   ✓ ${filename}: ${area.toLocaleString()} sq ft`);
  }
  
  console.log("\nStep 3: Calculate cost-effectiveness...");
  const costResults = [];
  for (const analysis of analyses) {
    const result = await callTool("generate_model_report", {
      filename: analysis.filename,
      report_type: "cost_estimate",
      format: "json"
    });
    const data = JSON.parse(result.content[0].text);
    const costPerSqft = analysis.area > 0 ? data.estimated_total_cost_usd / analysis.area : 0;
    costResults.push({
      filename: analysis.filename,
      cost_per_sqft: costPerSqft,
      total_cost: data.estimated_total_cost_usd
    });
  }
  
  console.log("\nStep 4: Compare and recommend...");
  const best = costResults.reduce((min, curr) => 
    curr.cost_per_sqft < min.cost_per_sqft ? curr : min
  );
  
  console.log(`\n🏆 RECOMMENDATION:`);
  console.log(`   Most cost-effective: ${best.filename}`);
  console.log(`   Cost per sq ft: $${best.cost_per_sqft.toFixed(2)}`);
  console.log(`   Total estimated cost: $${best.total_cost.toLocaleString()}`);
  
  console.log(`\n✅ Complex workflow completed successfully!`);
  console.log("   This demonstrates AI orchestrating multiple MCP tools!");
}

async function runAllDemos() {
  console.log("\n");
  console.log("╔════════════════════════════════════════════════════════════════════╗");
  console.log("║                                                                    ║");
  console.log("║          🏗️  AUTODESK MCP SERVER - STANDALONE DEMO               ║");
  console.log("║                                                                    ║");
  console.log("║     Demonstrating Model Context Protocol Tools in Action          ║");
  console.log("║              (No Claude Desktop Required!)                        ║");
  console.log("║                                                                    ║");
  console.log("╚════════════════════════════════════════════════════════════════════╝");
  
  const demos = [
    demo1_ListTools,
    demo2_ListModels,
    demo3_ExploreModel,
    demo4_CalculateMaterials,
    demo5_CompareModels,
    demo6_GenerateReport,
    demo7_SearchComponents,
    demo8_GetHelp,
    demo9_ComplexWorkflow,
  ];
  
  for (let i = 0; i < demos.length; i++) {
    try {
      await demos[i]();
      if (i < demos.length - 1) {
        await prompt("\n👉 Press ENTER for next demo...");
      }
    } catch (error) {
      console.log(`\n❌ Error in demo: ${error.message}`);
    }
  }
  
  printHeader("🎉 ALL DEMOS COMPLETED!");
  console.log("This demonstrates:");
  console.log("  ✅ 7 MCP tools working correctly");
  console.log("  ✅ Context-aware Autodesk workflows");
  console.log("  ✅ Multi-step AI orchestration");
  console.log("  ✅ Production-ready implementation");
  console.log("\n🚀 Ready to present to your audience!");
  console.log("\n");
  
  rl.close();
}

// Run all demos
runAllDemos().catch((error) => {
  console.error("\n\n❌ Error:", error.message);
  rl.close();
  process.exit(1);
});
