import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{},//用户信息
    likeList:[], //用户喜欢列表
    myComment:{},
    musicDanMessage:{},
    currentMusic:{},
    defaultGroup:[],//用户歌单标签
    commentFlag:''
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
    },
    getMusicDanMessage2(state,x){
      this.state.musicDanMessage.coverImgUrl = x.coverImgUrl
    },
    addMusic(state,x){
      this.state.currentMusic = x
    },
    addGroup(state,x){
      this.state.defaultGroup = x
    },
    addcommentFlag(state,x){
   
      state.commentFlag = x
    }

  },
  actions: {
    
  },
  modules: {
  }
})