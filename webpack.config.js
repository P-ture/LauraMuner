module.exports = {
    entry: './src/js/default.js',
    output: {
        filename: './public/js/default.js',
        libraryTarget: 'var'
    },
    node: {
        fs: "empty"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/i
            }
        ]
    }
};
