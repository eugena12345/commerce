import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TsCheckerPlugin from 'fork-ts-checker-webpack-plugin';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildPath = path.resolve(__dirname, 'dist');
const isProd = process.env.NODE_ENV === 'production';
const getSettingsForStyles = (withModules = false) => {
    return [
        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
        !withModules
            ? 'css-loader'
            : {
                loader: 'css-loader',
                options: {
                    modules: {
                        localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
                        namedExport: false,
                    },
                },
            },
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: ['autoprefixer'],
                },
            },
        },
        'sass-loader',
    ];
};
const config = {
    entry: path.resolve(__dirname, './src/index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
        clean: true,

    },

    mode: isProd ? 'production' : 'development',
    target: !isProd ? 'web' : 'browserslist',
    devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
    module:
    {
        rules: [
            {
                test: /\.module\.s?css$/,
                use: getSettingsForStyles(true),
            },
            {
                test: /\.s?css$/,
                exclude: /\.module\.s?css$/,
                use: getSettingsForStyles(),
            },
            {
                test: /\.[tj]sx?$/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|svg|jpg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.jsx', '.js', '.ts'],
        alias: {
            components: path.resolve(__dirname, './src/components'),
            config: path.resolve(__dirname, './src/config'),
            styles: path.resolve(__dirname, './src/styles'),
            utils: path.resolve(__dirname, './src/utils'),
            models: path.resolve(__dirname, './src/models'),
            store: path.resolve(__dirname, './src/store'),
            pages: path.resolve(__dirname, './src/App/pages'),
            assets: path.resolve(__dirname, './src/assets/'),
        }
    },
    devServer: {
        host: '127.0.0.1',
        port: 9000,
        hot: true,
        historyApiFallback: true,
        static: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
        }),
        !isProd && new ReactRefreshWebpackPlugin(),
        isProd && new MiniCssExtractPlugin({
            filename: '[name]-[hash].css',
        }),
        new TsCheckerPlugin()
    ],
}

export default config;