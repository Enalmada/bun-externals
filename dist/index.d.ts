export default function getExternalsFromCurrentWorkingDirPackageJson(): Promise<string[]>;
export declare function handleBuildResult(result: {
    success: boolean;
    logs: any[];
}): void;
export declare function bunBuild(options: any): Promise<void>;
