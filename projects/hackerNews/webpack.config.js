const path = require('path')
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //Definisco il file js di output (script.js) grazie alla variabile [name.js]
    mode : 'development',
    entry : {
        script : path.resolve(__dirname, 'src/js/index.js'),
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    //Collego i moduli loader: non ho bisogno del file css ma solo del scss
    module:{
        rules: [
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        }
        ]
    },
    plugins: [
        new Dotenv({
            path: './.env',
            safe: true, // load '../../path/to/other.env.example'
            defaults: true, // load '../../path/to/other.env.defaults'
          }),
          new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body', // Assicura che lo script venga inserito prima della chiusura del tag body
          })
    ]
}