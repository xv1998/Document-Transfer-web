const merge=require('webpack-merge');
const common=require('./webpack.config.common.js');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin  = require('clean-webpack-plugin');

module.exports=merge(common,{
    mode:'production',
    module:{
        rules:[

        ]
    },
    plugins:[
        new MiniCssExtractPlugin({//提取css
            filename:'css/main.css'
        }),
        new CleanWebpackPlugin('./dist'),//删除dist目录下的文件
        new BundleAnalyzerPlugin({ analyzerPort: 8090 }),

    ]
})
