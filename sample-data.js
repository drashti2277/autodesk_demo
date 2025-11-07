/**
 * Sample Autodesk model data for demonstration
 */

export const SAMPLE_MODELS = {
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

export const HELP_CONTENT = {
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
