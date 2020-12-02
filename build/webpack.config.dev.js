const path=require('path');
const webpack=require('webpack');
const merge=require('webpack-merge');//这里引入merge
const common=require('./webpack.config.common.js');//这里引入公共代码

module.exports=merge(common,{//注意这里的写法
    mode:'development',
    devtool:'cheap-module-eval-source-map',
    module:{
        rules:[

        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,//开启gzip压缩
        port: 8080,
        open:true,
        hot:true,
        overlay:true,
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
    ]
})
