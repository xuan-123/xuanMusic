import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{},//用户信息
    likeList:[], //用户喜欢列表
    myComment:{},
    musicDanMessage:{}
  },
  mutations: {
      //获取用户喜欢列表
    addLikeList(state,x){
        this.state.likeList = x
        console.log(x)
    },
    addUserInfo(state,x){
      this.state.userInfo = x
      console.log(x+'-------------------')
    },
    //获取用户评论
    getMyComment(state,x){
      this.state.myComment = x
      console.log(x)
    },
    //获取歌单详情
    getMusicDanMessage(state,x){
      this.state.musicDanMessage = x

    }

  },
  actions: {
  },
  modules: {
  }
})