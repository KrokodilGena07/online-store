import {BuildOptions} from './types';
import {Configuration, ProgressPlugin} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildPlugins({mode, paths}: BuildOptions): Configuration['plugins'] {
    const isDev = mode === 'development';
    const isProd = !isDev;

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: paths.html,
            favicon: paths.favicon
        })
    ];

    if (isDev) {
        plugins.push(new ProgressPlugin());
    }

    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }));
    }

    return plugins;
}