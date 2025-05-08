const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
    entry: './src/bootstrap.js',
    mode: 'development',
    devServer: {
        static: path.join(__dirname, 'dist'),
        port: 8080,
        historyApiFallback: true,
    },
    output: {
        publicPath: 'http://localhost:8080/',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new ModuleFederationPlugin({
            name: 'rootApp',
            remotes: {
                microApp1: 'microApp1@http://localhost:8081/remoteEntry.js',
                microApp2: 'microApp2@http://localhost:8082/remoteEntry.js',
            },
            exposes: {
                './eventBus': './src/eventBus.js',
                './store': './src/store/index.js',
            },
            shared: {
                vue: {
                    singleton: true,
                    eager: true,
                },
                'vue-router': {
                    singleton: true,
                    eager: true,
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};