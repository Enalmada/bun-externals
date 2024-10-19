// src/bunBuild.ts
import { bunBuildWrapper } from "./bunUtils";
function handleBuildResult(result) {
  if (!result.success) {
    console.error("Build failed");
    for (const message of result.logs) {
      console.error(message);
    }
    throw new AggregateError(result.logs, "Build failed");
  }
}
async function bunBuild(options) {
  const result = await bunBuildWrapper(options);
  handleBuildResult(result);
}
export {
  handleBuildResult,
  bunBuild
};
