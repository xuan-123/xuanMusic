var localStorages = {
    set(key,value){
        var curTime = new Date().getTime();//设置值时获取当前时间戳
        localStorage.setItem(key,JSON.stringify({data:value,time:curTime}))
    },
    get(key){ 
        var getData = JSON.parse(localStorage.getItem(key))
        return getData
    },
    remove(key){
        localStorage.removeItem(key)
    }
}
export default localStorages