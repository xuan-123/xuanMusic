
module.export = {
    devServer: {
        host:'0.0.0.0',
        port:8080,
        disableHostChect:true ,
        autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, 
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,//改变源
                ws: true,//跨域
                pathRewrite: {
                    '^/api':''
                }
            }
        }
  },
  build:{
      assetsPublicPath:'./'
  }
  
  }
  