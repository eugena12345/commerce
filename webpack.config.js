// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');

import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TsCheckerPlugin from 'fork-ts-checker-webpack-plugin';

import { fileURLToPath } from 'url';

// Получаем аналог __dirname (чтобы не было ошибки)
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
                // options: {
                //     modules: true, // Включаем поддержку CSS-модулей
                //     localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
                //     namedExport: false,

                //   },
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
//module.exports 
const config = {
    entry: path.resolve(__dirname, './src/index.tsx'),
    output: {
        // path: buildPath,
        // filename: "bundle.js",
        // publicPath: '/', //добавляю
        path: path.resolve(__dirname, 'dist'), // Путь к папке сборки
        filename: 'bundle.js', // Имя выходного файла
        publicPath: '/', // Корневой путь для статических файлов
        clean: true, // Очищает папку dist перед каждой сборкой
    
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
            // path.join(srcPath, 'components'),
            config: path.resolve(__dirname, './src/config'),
            //config: path.join(srcPath, 'config'),
            styles: path.resolve(__dirname, './src/styles'),
            //styles: path.join(srcPath, 'styles'),
            utils: path.resolve(__dirname, './src/utils'),
            //utils: path.join(srcPath, 'utils'),
            models: path.resolve(__dirname, './src/models'),
            //models: path.join(srcPath, 'models'),
            //добавляю от себ
            store: path.resolve(__dirname, './src/store'),
            pages: path.resolve(__dirname, './src/App/pages'),
            assets: path.resolve(__dirname, './src/assets/'),


           // "App/*": ["src/App/*"],
           // "assets/*": ["src/assets/*"],
           // "models/*": ["src/models/*"]
      
        }
    },
    devServer: {
        host: '127.0.0.1',
        port: 9000,
        hot: true,
        historyApiFallback: true,
       // publicPath: '/', //добавляю
        static: path.resolve(__dirname, 'dist'), //добавляю Папка с файлами

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