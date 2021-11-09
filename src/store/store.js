import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    likeList:[], //用户喜欢列表
  },
  mutations: {
      //获取用户喜欢列表
    addLikeList(state,x){
        this.state.likeList = x
        console.log(x)
    }

  },
  actions: {
  },
  modules: {
  }
})