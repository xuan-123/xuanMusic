//引用组件 用于Vue.use来安装
import Toast from './Toast' //引入插件组件
const obj  = {}
obj.install = function(Vue){ //install通过Vue.use安装
    // 1、必须创建组件构造器
    const toastContrustor = Vue.extend(Toast)
    //2、new的方式，根据组件构造器，可以创建出来一个组件对象
    const toast = new toastContrustor()
    //3、将组件对象toast，手动挂载到某一个元素div上
    toast.$mount(document.createElement('div'))
    //4、toast.$el对应的就是div
    document.body.appendChild(toast.$el)
    //5、将此插件添加到原型中
    Vue.prototype.$toast = toast
}
export default obj

