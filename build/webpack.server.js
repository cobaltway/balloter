const path = require('path'),
    { VueSSRServerPlugin } = require('vue-ssr-webpack-plugin');

module.exports = {
    watch: true,
    target: 'node',
    entry: path.join(__dirname, '../client/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../server/client'),
        libraryTarget: 'commonjs2'
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
        new VueSSRServerPlugin({
            filename: 'bundle.json'
        })
    ],
    externals: Object.keys(require('../package.json').dependencies)
};
