const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
    configureWebpack: config => {
        config.plugins.push(new MonacoWebpackPlugin());
    },
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        '404': 'src/main.js'
    }
};