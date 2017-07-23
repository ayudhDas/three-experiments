const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');

const PATHS = {
    entry: path.join(__dirname, 'src/index.ts'),
    indexHTML: path.join(__dirname, 'public/index.html'),
    outDir: path.join(__dirname, 'dist')
};

const commonConfig = {
    entry: {
        app: PATHS.entry
    },
    output: {
        path: PATHS.outDir,
        filename: 'app.[name].[hash:6].js'
    },
    target: 'web',
    resolve: {
        extensions: ['.js', '.ts'],
        modules: [path.resolve(__dirname, 'node_modules')]
    },
    module: {
        rules: [
            {
                test: /.ts$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader']
            },
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: PATHS.indexHTML
        })
    ]
};

const devConfig = {
    devtool: 'source-map',
    devServer: {
        clientLogLevel: "warning",
        compress: true,
        port: 9000,
        noInfo: true,
        overlay: {
            warnings: false,
            errors: true
        }
    }

};

const prodConfig = {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        })
    ]
};

module.exports = (env) => {
    if(env === 'development'){
        return merge(commonConfig, devConfig);
    }
    return merge(commonConfig, prodConfig);
}