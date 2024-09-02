import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {ProgressPlugin, Configuration} from 'webpack';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

type Mode = 'development' | 'production';

interface EnvVariables {
    port?: number;
    mode?: Mode;
}

export default (env: EnvVariables): Configuration => {
    const isDev = env.mode === 'development';

    return {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true
        },
        plugins: [
            isDev && new ProgressPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html'),
                favicon: path.resolve(__dirname, 'public', 'favicon.ico')
            }),
            !isDev && new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css'
            })
        ],
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript',
                            [
                                '@babel/preset-react',
                                {
                                    runtime: isDev ? 'automatic' : 'classic'
                                }
                            ]
                        ]
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        devtool: isDev ? 'inline-source-map' : 'source-map',
        devServer: isDev ? {
            port: env.port ?? 3000
        } : undefined
    };
}