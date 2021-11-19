
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
                target: 'https://musci-api-aq53vebj7-xuan-123.vercel.app',
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
  