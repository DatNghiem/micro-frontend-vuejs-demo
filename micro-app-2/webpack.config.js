const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
    entry: './src/bootstrap.js',
    mode: 'development',
    devServer: {
        static: path.join(__dirname, 'dist'),
        port: 8082,
        historyApiFallback: true,
    },
    output: {
        publicPath: 'http://localhost:8082/',
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
            name: 'microApp2',
            filename: 'remoteEntry.js',
            exposes: {
                './MicroApp2': './src/bootstrap.js',
                './EventTester': './src/components/EventTester.vue',
            },
            remotes: {
                rootApp: 'rootApp@http://localhost:8080/remoteEntry.js',
            },
            shared: {
                vue: {
                    singleton: true,
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};