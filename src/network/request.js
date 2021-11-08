import axios from 'axios'
import { Loading } from 'element-ui'
export function request(url,params){
    const instance = axios.create({
        baseURL:'http://localhost:3000',
        async:true,
        crossDomain:true,
    })
    instance.interceptors.request.use(config=>{
       let token =  window.sessionStorage.getItem('token')
       let cookie =  window.sessionStorage.getItem('cookie')
       

       if(token){
            config.headers.post['Content-Type'] = 'application/json';
            config.headers.common['Authorization'] = "Bearer " + JSON.parse(token)
        }

        Loading.service({});//请求接口loading
        // this.$toast.showLongTime('加载中 ') //可以使用自己封闭的toast，也可使用Loading插件
        return config
    }),err=>{
        return err
    }
    instance.interceptors.response.use(res=>{
        
        Loading.service().close()//关闭请求接口loading
        // this.$toast.closeLongTime('加载中')

        return res
    },err=>{
        return err
    })
    if (params) {
        params = {
            params: params
        }
        return instance.get(url, params)
    } else {
        return instance.get(url)
    }
    // return instance(config)
}