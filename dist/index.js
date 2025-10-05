// src/index.ts
import { bunBuild, handleBuildResult } from "./bunBuild";
import getExternalsFromCurrentWorkingDirPackageJson from "./externalDependencies";
import { prependDirectiveToBuiltFiles, removeBadClientStringFromFiles } from "./prependClientDirective";
import getSourceFiles from "./sourceFiles";
var src_default = getExternalsFromCurrentWorkingDirPackageJson;
export {
  removeBadClientStringFromFiles,
  prependDirectiveToBuiltFiles,
  handleBuildResult,
  getSourceFiles,
  getExternalsFromCurrentWorkingDirPackageJson,
  src_default as default,
  bunBuild
};
