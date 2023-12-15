// src/sourceFiles.ts
import fg from "fast-glob";
async function getSourceFiles(source = "./src/**/*.{ts,tsx,js,jsx}", options) {
  return await fg(source, options);
}
export {
  getSourceFiles as default
};
