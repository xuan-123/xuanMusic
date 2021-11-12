<template>
  <div class="likemusic">
      <!-- {{myComment}} -->
        
      <div class="comment">
          <h3>我的评论({{myComment.commentCount}})</h3>
          <div>
              <div class="top">
                  <div style="display:flex;align-items: center">
                      <img src="https://p1.music.126.net/UrR6ReDBMbdJvvg-yMO4Lw==/109951165350184146.jpg" alt="">
                    <p class="title">{{resourceInfo.name}} {{resourceInfo.artist.name}}</p>
                  </div>
                  <p class="good" :class="myComment.comments[0].liked?'red':''">赞{{myComment.comments[0].likedCount}}</p>
              </div>
              <p class="commentContent">{{myComment.comments[0].content}}</p>
              <p class="time">{{myComment.comments[0].time |formatDate2}}</p>
          </div>
      </div>
      <div class="goMore" @click="goMyComment">查看全部</div>
  </div>
</template>

<script>
export default {
  mounted() {
       this.userInfo = JSON.parse(this.$store.state.userInfo)
       this.myComment = this.$store.state.myComment
       this.resourceInfo = JSON.parse(this.myComment.comments[0].resourceInfo)
  },
  data(){
      return {
         myComment:{},
         resourceInfo:{}
      }
  },
  methods: {
      goMyComment(){
          this.$router.push('/mycommentpage')
      }
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
}
.comment img{
    width: 30px;
    height: 30px;
    margin-right: 10px;
}
h3{
    
}
.top{
    margin: 10px 0;
    /* background-color: #ccc; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-size: 12px;
    color: #b1b1b1;
}
.time{
    font-size: 12px;
    color: #b1b1b1;
    margin-top: 5px;
}
.goMore{
    height: 20px;
    line-height: 20px;
    border-top: 1px solid #e3e3e3;
    padding: 0 15px;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    padding-top: 5px;
    color: #b1b1b1;
    font-size: 12px;
}
.red{
    color: red;
}
</style>