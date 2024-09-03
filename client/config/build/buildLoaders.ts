import {BuildOptions} from './types';
import {ModuleOptions} from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {buildBabelLoader} from './babel/buildBabelLoader';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development';

    const svgrLoader = {
        test: /\.svg$/i,
        loader: '@svgr/webpack',
        options: {
            icon: true,
            svgoConfig: {
                plugins: [
                    {
                        name: 'convertColors',
                        params: {
                            currentColor: true
                        }
                    }
                ]
            }
        }
    };

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
    };

    const cssLoader = {
        test: /\.css$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader'
        ]
    };

    const babelLoader = buildBabelLoader(options);

    return [
        svgrLoader,
        assetLoader,
        cssLoader,
        babelLoader
    ];
}