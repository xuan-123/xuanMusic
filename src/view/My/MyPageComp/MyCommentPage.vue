<template>
  <div class="myComment">
      <nav-bar>
            <div slot="left"><p class="iconfont icon-fanhui" @click="$router.go(-1)"></p></div>
            <div slot="center">评论({{myComment.commentCount}})</div>
            <div slot="right"></div>
      </nav-bar>
      <div class="comment">
          
          <div v-for="item in this.myComment.comments" :key="item.time">
              <div class="top">
                  <div style="display:flex;align-items: center">
                      <img :src="JSON.parse(item.resourceInfo).coverUrl || item.user.avatarUrl" alt="">
                    <p class="title">{{JSON.parse(item.resourceInfo).title || (JSON.parse(item.resourceInfo).name + '-' + JSON.parse(item.resourceInfo).artist.name)}}</p>
                  </div>
                  <p class="good" :class="item.liked?'red':''">赞{{item.likedCount}}</p>
              </div>
              <p class="commentContent">{{item.content}}</p>
              <p class="time">{{item.time | formatDate2}}</p>
          </div>
      </div>
  </div>
</template>

<script>
import NavBar from '../../../components/NavBar/NavBar.vue'

export default {
    components:{
        NavBar
    },
  mounted() {
       this.myComment = this.$store.state.myComment
       this.resourceInfo = JSON.parse(this.myComment.comments[0].resourceInfo)
       console.log(this.myComment)
  },
  data(){
      return {
         myComment:{},
         resourceInfo:{}
      }
  },
  methods: {

  }
};
</script>

<style scoped>
.likemusic {
  /* height: 120px; */
  background-color: #fff;
  width: 100%;
  border-radius: 10px;
  padding: 10px 10px;
  box-sizing: border-box;
  align-items: center;
  font-size: 14px;
}

.comment{
    margin: 10px 0;
    padding: 10px;
    font-size: 14px;
}
.comment img{
    width: 30px;
    height: 30px;
    margin-right: 10px;
}
.top{
    margin: 10px 0;
    /* background-color: #ccc; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-size: 12px;
    color: #b6b6b6;
}
.time{
    font-size: 12px;
    color: #b6b6b6;
    margin-top: 5px;
}
.myComment{
    padding-top: 44px;
}
.red{
    color: red;
}
</style>