const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'developement';

    return {
        entry: path.join(__dirname, 'src', 'main.js'),
        mode: isProduction ? 'production' : 'development',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: isProduction ? '/lazy-loading-vrscans-library/' : '/'
        },
        devServer: {
            port: 3000
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                },
                {
                    test: /\.(png|jp(e*)g|gif)$/,
                    use: ['file-loader'],
                },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack'],
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, '', 'index.html')
            })
        ]
    
    };
};
