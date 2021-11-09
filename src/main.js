import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
//全局中样式表
import 'vant/lib/index.css';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/lib/css/exist.css';
import './assets/lib/iconfont/iconfont.css'
//全局js
import './assets/lib/js/jquery-1.11.1'
import global_ from './assets/lib/js/Global'
// import './assets/lib/js/flexible'
//本地存储使用
import storageLocal from './assets/lib/js/localStorage'
//全局过滤器
import *as filter from './assets/lib/js/filter/filter'
// import './assets/lib/js/flexible'
Object.keys(filter).forEach((key)=>{
  Vue.filter(key,filter[key])
})
//图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: 'https://img0.baidu.com/it/u=575606243,3134290217&fm=26&fmt=auto',
  loading: 'https://img0.baidu.com/it/u=1284852827,262692336&fm=26&fmt=auto',
  attempt: 1
  })
  //视频播放插件
import VueVideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';
Vue.use(VueVideoPlayer)
//吐司
import toast from './common/Toast/index.js'
Vue.use(toast) 
//vant
import { Circle } from 'vant';
import { Popup  } from 'vant';
import { Area  } from 'vant';
Vue.use(Circle);
Vue.use(Popup);
Vue.use(Area);
Vue.prototype.gloUser = [true]

Vue.prototype.Global= global_
Vue.prototype.storageLocal = storageLocal
Vue.config.productionTip = false
//网络请求
import { request } from "./network/request";
Vue.prototype.$request = request;

new Vue({
  router,store,
  render: function (h) { return h(App) },
}).$mount('#app')


