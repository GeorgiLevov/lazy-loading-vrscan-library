const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

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
                    test: /\.(jsx|js)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, '', 'index.html')
            })
        ]
    
    };
};
