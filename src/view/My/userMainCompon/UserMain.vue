<template>
    <div class="usermain">
        <nav-bar>
            <div slot="left"><p class="iconfont icon-fanhui" @click="$router.go(-1)"></p></div>
            <div slot="center">{{userInfo.nickname}}</div>
            <div slot="right"></div>
        </nav-bar>
        <Bscroll
      :probeType="3"
      :click="true"
      :scrollX="true"
      :data="userInfo" 

      class="wrapper"
    >
      <div class="content">
             <div class="userInfo">
            <div class="img">
                <img :src="userInfo.avatarUrl" alt="">
            </div>
            <div class="edit">
                <div class="top">
                    <div @click="gotoFollowed(0)">
                        <p>{{userInfo.followeds}}</p>
                        <p>粉丝</p>
                    </div>
                    <div @click="gotoFollowed(1)">
                        <p>{{userInfo.follows}}</p>
                        <p>关注</p>
                    </div>
                    <div @click="goLevel">
                        <p>{{userLevel.level}}</p>
                        <p>等级</p>
                    </div>
                </div>
                <div class="bottom" @click="goEditMasseg">编辑信息</div>
            </div>
            </div>
            <!-- 创建歌单 -->
            <MusicDan/>
            <!-- 评论 -->
            <MyComment />
        </div>
    </Bscroll>
       
    </div>
</template>

<script>
import Bscroll from '../../../components/Bscroll/Bscroll.vue'
import MusicDan from "../MyPageComp/MusicDan.vue";
import MyComment from "../MyPageComp/MyComment.vue";
import NavBar from "../../../components/NavBar/NavBar.vue";
export default {
  components: {
    NavBar,
    MyComment,
    MusicDan,Bscroll
  },
  data() {
    return {
      userInfo: {},
      userLevel: {},
    };
  },
  mounted() {
    this.userInfo = JSON.parse(this.$store.state.userInfo);
    console.log(this.$store.state.userInfo);
    this.getDatas();
    this.getComment();
  },
  methods: {
    async getDatas() {
      var res = await this.$request("/user/level", {
        // uid:this.$route.params.id,
        cookie: encodeURIComponent(
          JSON.parse(window.sessionStorage.getItem("cookie"))
        ), //报301的添加cookie
      });
      console.log(res);
      this.userLevel = res.data.data;
    },
    async getComment() {
      var res = await this.$request("/user/comment/history", {
        uid: this.userInfo.userId,
        cookie: encodeURIComponent(
          JSON.parse(window.sessionStorage.getItem("cookie"))
        ), //报301的添加cookie
      });
      this.$store.commit("getMyComment", res.data.data);
    },
    //去粉丝页
    gotoFollowed(id) {
      this.$router.push("/followedpage/" + id);
    },
    goLevel() {
      window.localStorage.setItem("userlevel", JSON.stringify(this.userLevel));
      // emitter.emit('userlevel',this.userLevel)
      this.$router.push("/userlevel");
    },
    goEditMasseg() {
      this.$router.push("/usereditmasseg");
    },
  },
};
</script>

<style scoped>
.wrapper {
  height: calc(100vh - 44px);
  overflow: hidden;
  /* min-height: calc(120vh); */
}
.content{
    padding: 10px 0;
}
.usermain {
  padding: 44px 0;
  background-color: #f7f7f7;
  height: 100%;
  padding: 46px 10px 0;
  box-sizing: border-box;

}
.userInfo {
  border-radius: 10px;
  background-color: #fff;
  padding: 0 20px;
  box-sizing: border-box;
  height: 100px;
  width: 100%;
  display: flex;
  /* background-color: #ccc; */
  align-items: center;
  margin-bottom: 10px;
}
.userInfo img {
  width: 80px;
  height: 80px;
}
.img {
  flex: 2;
}
.edit {
  font-size: 14px;
  flex: 6;
  height: 100%;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.edit .top {
  display: flex;
  justify-content: space-around;
}
.edit .top div {
  text-align: center;
}
.edit .bottom {
  height: 24px;
  line-height: 24px;
  margin: 0 auto;
  width: 90%;
  border-radius: 10px;
  border: 1px solid #e3e3e3;
  text-align: center;
}
</style>