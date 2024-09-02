export interface BuildOptions {
    port: number;
    mode: BuildMode;
    paths: BuildPaths;
}

export interface BuildPaths {
    entry: string;
    output: string;
    html: string;
    favicon: string;
}

export type BuildMode = 'development' | 'production';