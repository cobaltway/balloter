const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    watch: true,
    target: 'web',
    entry: path.join(__dirname, '../client/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../server/public')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: '../client/template.html',
            template: path.join(__dirname, '../client/template.html'),
            inject: false
        })
    ]
};
