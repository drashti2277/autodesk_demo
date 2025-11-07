# Autodesk MCP Server Demo - Usage Examples

This document shows example queries you can use with the Autodesk MCP Server demo.

## Available Sample Models

The demo includes these sample models:
- `office-building-01.rvt` - 5-story office building (Revit)
- `residential-home-02.rvt` - 2-story residential home (Revit)
- `warehouse-facility-03.rvt` - Large warehouse (Revit)
- `bridge-design-01.dwg` - Bridge design (AutoCAD)
- `mechanical-assembly-01.ipt` - Mechanical assembly (Inventor)

## Example Queries to Try

### 1. List All Available Models
**You:** "What models do I have available?"

**Expected:** The AI will use `list_available_models` to show all sample models.

---

### 2. Explore a Specific Model
**You:** "Tell me about the office building model"

**Expected:** The AI will use `explore_model_data` on `office-building-01.rvt` and provide a summary.

**You:** "How many doors and windows does the office building have?"

**Expected:** The AI will query component counts.

---

### 3. Calculate Material Quantities
**You:** "Calculate the concrete needed for the warehouse"

**Expected:** The AI will use `calculate_material_takeoff` on `warehouse-facility-03.rvt` for concrete.

**You:** "Give me a material takeoff for the residential home"

**Expected:** The AI will calculate all materials (concrete, steel, drywall) for the home.

---

### 4. Compare Models
**You:** "Compare the office building with the residential home"

**Expected:** The AI will use `compare_model_versions` to show differences in quantities.

**You:** "What's the size difference between the warehouse and office building?"

**Expected:** Comparison focused on areas and volumes.

---

### 5. Search for Components
**You:** "How many windows are in the office building?"

**Expected:** The AI will use `search_model_components` to find window counts.

**You:** "Search for all doors in the warehouse"

---

### 6. Generate Reports
**You:** "Generate a cost estimate for the office building"

**Expected:** The AI will use `generate_model_report` with report_type "cost_estimate".

**You:** "Create a quantity takeoff report for the warehouse in markdown format"

**Expected:** Detailed quantity report in markdown format.

**You:** "Generate a full summary report for the bridge design"

---

### 7. Get Autodesk Help
**You:** "How do I get started with Revit?"

**Expected:** The AI will use `get_autodesk_help` for Revit getting started info.

**You:** "Explain Revit families"

**Expected:** Help content about working with families.

**You:** "How do I create assemblies in Fusion 360?"

---

### 8. Complex Multi-Step Workflows
**You:** "Analyze all the Revit models and tell me which one is the largest by area and volume"

**Expected:** The AI will:
1. List all models
2. Filter for Revit files
3. Explore data for each
4. Compare and identify the largest

**You:** "For the office building, give me the total area, room count, and estimated cost"

**Expected:** The AI will:
1. Explore the model data
2. Generate a cost estimate
3. Summarize the results

**You:** "Compare the material requirements for all three Revit building models"

**Expected:** The AI will:
1. Calculate material takeoffs for each
2. Compare quantities
3. Present a summary

---

## Advanced Demo Scenarios

### Construction Planning
**You:** "I need to plan construction for the warehouse. Give me material quantities and cost estimates"

### Design Review
**You:** "Review the office building model and tell me key statistics I should present to the client"

### Quality Control
**You:** "Compare the office building with the warehouse and identify which has more components per square foot"

### Multi-Model Analysis
**You:** "Analyze all models and create a summary table showing total area, component count, and estimated costs"

---

## Tips for Presenting the Demo

1. **Start Simple**: Begin with listing models and exploring one
2. **Show Intelligence**: Demonstrate natural language queries work
3. **Highlight Automation**: Show multi-step workflows that combine multiple tools
4. **Emphasize Context**: Show how the AI understands Autodesk-specific concepts
5. **Show Flexibility**: Use different formats (JSON vs Markdown reports)

## What Makes This MCP Server Special

✅ **Context-Aware**: Understands Autodesk-specific terminology and workflows  
✅ **Multi-Format Support**: Works with Revit, AutoCAD, Inventor, and more  
✅ **Smart Automation**: Combines multiple operations intelligently  
✅ **Production-Ready Pattern**: Built with proper error handling and validation  
✅ **Extensible**: Easy to add more tools and capabilities  

This demonstrates how developers can build production-grade MCP servers for specialized domains before official versions are available!
