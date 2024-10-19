// src/prependClientDirective.ts
import fs from "node:fs";
import path from "node:path";
var clientDirectiveRegex = /^\s*["']use client["'];/m;
function findFilesWithDirective(directory) {
  let results = [];
  const items = fs.readdirSync(directory);
  items.forEach((item) => {
    const itemPath = path.join(directory, item);
    const stat = fs.statSync(itemPath);
    if (stat?.isDirectory()) {
      results = results.concat(findFilesWithDirective(itemPath));
    } else if (item.endsWith(".ts") || item.endsWith(".tsx")) {
      const content = fs.readFileSync(itemPath, "utf-8");
      if (clientDirectiveRegex.test(content)) {
        results.push(itemPath);
      }
    }
  });
  return results;
}
function prependDirectiveToBuiltFiles(srcDirectory, buildDirectory) {
  const files = findFilesWithDirective(srcDirectory);
  files.forEach((file) => {
    const relativePath = path.relative(srcDirectory, file);
    const distPath = path.join(buildDirectory, relativePath).replace(/\.tsx?$/, ".js");
    if (fs.existsSync(distPath)) {
      const content = fs.readFileSync(distPath, "utf-8");
      const updatedContent = `'use client';\n\n${content}`;
      fs.writeFileSync(distPath, updatedContent);
      console.log(`Prepended 'use client' directive to ${distPath}`);
    }
  });
}
function removeBadClientStringFromFiles(dir) {
  const targetString = '"use client";';
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      removeBadClientStringFromFiles(filePath);
    } else {
      let content = fs.readFileSync(filePath, "utf8");
      if (content.includes(targetString)) {
        content = content.replace(new RegExp(targetString, "g"), "");
        fs.writeFileSync(filePath, content, "utf8");
        console.log(`Removed bad string from ${filePath}`);
      }
    }
  });
}
export {
  removeBadClientStringFromFiles,
  prependDirectiveToBuiltFiles
};
