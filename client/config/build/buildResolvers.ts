import {BuildOptions} from './types';
import {Configuration} from 'webpack';

export function buildResolvers({paths}: BuildOptions): Configuration['resolve'] {
    return {
        extensions: ['.tsx', '.ts', '.js']
    };
}