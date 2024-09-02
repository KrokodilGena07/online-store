import {BuildOptions} from './types';
import {ModuleOptions} from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {buildBabelLoader} from './babel/buildBabelLoader';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development';

    const cssLoader = {
        test: /\.css$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader'
        ]
    };

    const babelLoader = buildBabelLoader(options);

    return [
        cssLoader,
        babelLoader
    ];
}