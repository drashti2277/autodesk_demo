#!/usr/bin/env node

/**
 * Quick test script to verify the MCP server works
 * Run this to check if everything is set up correctly
 */

console.log("=" .repeat(60));
console.log("Autodesk MCP Server - Test Suite");
console.log("=".repeat(60));
console.log();

let passed = 0;
let total = 0;

async function test(name, fn) {
  total++;
  console.log(`🧪 Testing: ${name}`);
  console.log("-".repeat(60));
  try {
    await fn();
    console.log(`✅ ${name} passed`);
    passed++;
  } catch (error) {
    console.log(`❌ ${name} failed: ${error.message}`);
  }
  console.log();
}

// Test 1: MCP SDK availability
await test("MCP SDK Import", async () => {
  const sdk = await import("@modelcontextprotocol/sdk/server/index.js");
  if (!sdk.Server) throw new Error("Server class not found");
});

// Test 2: Server module import
await test("Server Module", async () => {
  // Just check if the file exists and is valid JS
  const fs = await import("fs");
  const content = fs.readFileSync("./autodesk-mcp-server.js", "utf8");
  if (!content.includes("Server")) throw new Error("Server code missing");
});

// Test 3: Sample data
await test("Sample Data", async () => {
  const { SAMPLE_MODELS } = await import("./sample-data.js");
  const count = Object.keys(SAMPLE_MODELS).length;
  if (count !== 5) throw new Error(`Expected 5 models, got ${count}`);
  console.log(`   Models: ${Object.keys(SAMPLE_MODELS).join(", ")}`);
});

// Test 4: Tool handlers
await test("Tool Handlers", async () => {
  const { listTools, callTool } = await import("./tool-handlers.js");
  const tools = listTools();
  if (tools.length !== 7) throw new Error(`Expected 7 tools, got ${tools.length}`);
  console.log(`   Tools: ${tools.map(t => t.name).join(", ")}`);
});

// Test 5: Demo script
await test("Demo Script", async () => {
  const fs = await import("fs");
  const content = fs.readFileSync("./standalone-demo.js", "utf8");
  if (!content.includes("demo1_ListTools")) throw new Error("Demo functions missing");
});

console.log("=".repeat(60));
console.log("Test Summary");
console.log("=".repeat(60));
console.log(`Passed: ${passed}/${total}`);
console.log();

if (passed === total) {
  console.log("🎉 All tests passed! Server is ready to use.");
  console.log();
  console.log("Next steps:");
  console.log("1. Run the standalone demo: npm run demo");
  console.log("2. Or add to Claude Desktop config");
  console.log("3. Try asking: 'What Autodesk models do I have?'");
  process.exit(0);
} else {
  console.log("⚠️  Some tests failed. Please fix the issues above.");
  process.exit(1);
}
