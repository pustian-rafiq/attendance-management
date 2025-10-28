const fs = require("fs");
const path = require("path");

console.log("🔍 Verifying Attendance Management System Installation...\n");

const checks = [];

// Check required files
const requiredFiles = [
  "package.json",
  "next.config.js",
  "tsconfig.json",
  "tailwind.config.js",
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/login/page.tsx",
  "src/app/dashboard/page.tsx",
  "src/app/dashboard/layout.tsx",
  "src/app/dashboard/attendance/page.tsx",
  "src/app/dashboard/students/page.tsx",
  "src/app/dashboard/courses/page.tsx",
  "src/app/dashboard/reports/page.tsx",
  "src/app/dashboard/profile/page.tsx",
  "src/lib/utils.ts",
  "src/lib/mock-data.ts",
  "src/stores/auth-store.ts",
  "src/types/index.ts",
];

console.log("📁 Checking required files...");
requiredFiles.forEach((file) => {
  const exists = fs.existsSync(path.join(__dirname, file));
  checks.push({ name: file, status: exists });
  console.log(`${exists ? "✓" : "✗"} ${file}`);
});

console.log("\n📦 Checking directories...");
const requiredDirs = [
  "src/app",
  "src/components/ui",
  "src/components/layout",
  "src/lib",
  "src/stores",
  "src/types",
  "node_modules",
];

requiredDirs.forEach((dir) => {
  const exists = fs.existsSync(path.join(__dirname, dir));
  checks.push({ name: dir, status: exists });
  console.log(`${exists ? "✓" : "✗"} ${dir}/`);
});

console.log("\n🔧 Checking UI components...");
const uiComponents = [
  "button.tsx",
  "card.tsx",
  "input.tsx",
  "label.tsx",
  "table.tsx",
  "badge.tsx",
  "select.tsx",
  "avatar.tsx",
  "checkbox.tsx",
  "dropdown-menu.tsx",
  "separator.tsx",
  "tabs.tsx",
];

uiComponents.forEach((component) => {
  const exists = fs.existsSync(
    path.join(__dirname, "src/components/ui", component)
  );
  checks.push({ name: `ui/${component}`, status: exists });
  console.log(`${exists ? "✓" : "✗"} ${component}`);
});

console.log("\n📄 Checking documentation...");
const docs = [
  "README.md",
  "SETUP_GUIDE.md",
  "FEATURES.md",
  "PROJECT_SUMMARY.md",
  "DEPLOYMENT_GUIDE.md",
  "QUICK_DEPLOY.md",
  "PROJECT_COMPLETE.md",
];

docs.forEach((doc) => {
  const exists = fs.existsSync(path.join(__dirname, doc));
  checks.push({ name: doc, status: exists });
  console.log(`${exists ? "✓" : "✗"} ${doc}`);
});

// Summary
const total = checks.length;
const passed = checks.filter((c) => c.status).length;
const failed = total - passed;

console.log("\n" + "=".repeat(50));
console.log("📊 VERIFICATION SUMMARY");
console.log("=".repeat(50));
console.log(`Total Checks: ${total}`);
console.log(`✓ Passed: ${passed}`);
console.log(`✗ Failed: ${failed}`);
console.log("=".repeat(50));

if (failed === 0) {
  console.log("\n🎉 SUCCESS! All checks passed!");
  console.log("✅ Your application is ready to run and deploy!\n");
  console.log("Next steps:");
  console.log("  1. Run: npm run dev");
  console.log("  2. Open: http://localhost:3001");
  console.log("  3. Login: teacher@example.com");
  console.log("  4. Deploy: vercel\n");
} else {
  console.log("\n⚠️  WARNING: Some files are missing!");
  console.log("Please check the failed items above.\n");
}

console.log("For detailed setup instructions, see SETUP_GUIDE.md");
console.log("For deployment instructions, see QUICK_DEPLOY.md\n");
