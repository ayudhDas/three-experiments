const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
        filename: '[name].[hash:6].js'
    },
    target: 'web',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        modules: [path.resolve(__dirname, 'node_modules')]
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                exclude: /\.(jsx?|tsx?|css)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader']
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                                {
                                    loader: 'css-loader',
                                    options: {
                                     importLoaders: 1,
                                    }
                                },
                                'postcss-loader'
                        ]
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: PATHS.indexHTML
        }),
        new ExtractTextPlugin('[name].[hash:6].css')
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