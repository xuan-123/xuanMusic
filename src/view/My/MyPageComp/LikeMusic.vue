<template>
  <div class="likemusic" @click="goMyLikeList">
    <img src="https://avatars.githubusercontent.com/u/57024269?s=40&v=4" alt="" />
    <div>
        <p>我喜欢的音乐</p>
        <p class="listLen">{{ListLen}}首</p>
    </div>
  </div>
</template>

<script>
export default {
  // /likelist?uid=32953014
  mounted() {
       this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

      this.getLikeLise()
  },
  data(){
      return {
          ListLen:0,
          likeList:[]
      }
  },
  methods: {
    async getLikeLise() {
      let res = await this.$request("/likelist", {
        uid: this.userInfo.userId,
        cookie: encodeURIComponent(
          JSON.parse(window.sessionStorage.getItem("cookie"))
        ), //报301的添加cookie
      });
      console.log(res.data)
      this.likeList = res.data.ids
      this.ListLen = res.data.ids.length
    },
    goMyLikeList(){
        this.$store.commit('addLikeList',this.likeList)
        this.$router.push('/likemusiclistPage')
    }
  },
};
</script>

<style scoped>
.likemusic {
  height: 80px;
  background-color: #fff;
  width: 100%;
  border-radius: 10px;
  padding: 15px 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.likemusic img{
    width: 60px;
    height: 100%;
    margin-right: 10px;
}
.listLen{
    font-size: 12px;
    color: #ccc;
    margin-top: 10px;
}
</style>