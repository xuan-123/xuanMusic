
module.export = {
    devServer: {
        host:'192.168.236.142',
        port:8080,
        disableHostChect:true ,
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
  