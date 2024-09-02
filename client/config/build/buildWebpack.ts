import {BuildOptions} from './types';
import {Configuration} from 'webpack';
import {buildPlugins} from './buildPlugins';
import {buildLoaders} from './buildLoaders';
import {buildResolvers} from './buildResolvers';
import {buildDevServer} from './buildDevServer';

export function buildWebpack(options: BuildOptions): Configuration {
    const isDev = options.mode === 'development';

    return {
        mode: options.mode,
        entry: options.paths.entry,
        output: {
            path: options.paths.output,
            filename: '[name].[contenthash].js',
            clean: true
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolvers(options),
        devtool: isDev ? 'inline-source-map' : 'source-map',
        devServer: isDev ? buildDevServer(options) : undefined
    };
}