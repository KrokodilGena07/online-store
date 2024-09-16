export interface BuildOptions {
    port: number;
    mode: BuildMode;
    paths: BuildPaths;
    analyzer: boolean;
    api: string;
}

export interface BuildPaths {
    entry: string;
    output: string;
    html: string;
    favicon: string;
    src: string;
}

export type BuildMode = 'development' | 'production';