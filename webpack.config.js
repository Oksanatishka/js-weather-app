const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: ['./src/js/index.js', './src/styles/app.css'],
    output: {
        // filename: './dist/app.bundle.js'
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'dist')
        // filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'src')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'object:data', 'link:href', 'a:href'],
                        minimize: !devMode
                    }
                }
            },
            {
                test: /\.(png|svg|jpe?g|gif|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            emitFile: true,
                            outputPath: 'images',
                            publicPath: 'images'
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist']
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        // new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'index.html',
            // filename: './dist/index.html',
            template: './src/index.html'
        }),
        new Dotenv()
    ]
};
