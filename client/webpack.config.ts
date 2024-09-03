import path from 'path';
import {Configuration} from 'webpack';
import {BuildMode, BuildPaths} from './config/build/types';
import {buildWebpack} from './config/build/buildWebpack';

interface EnvVariables {
    port?: number;
    mode?: BuildMode;
    analyzer?: boolean;
}

export default (env: EnvVariables): Configuration => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
        src: path.resolve(__dirname, 'src')
    };

    return buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths,
        analyzer: env.analyzer ?? false
    });
}