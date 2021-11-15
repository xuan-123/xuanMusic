<template>
  <div class="my">
    <nav-bar>
      <div slot="left">
        <p class="iconfont icon-tubiaolunkuohua_caidan"></p>
      </div>
      <div slot="center">{{ userInfo.nickname }}</div>
      <div slot="right"><p class="iconfont icon-saomiao"></p></div>
    </nav-bar>
    <Bscroll
      :probeType="3"
      :click="true"
      :scrollX="true"
      :listenScroll="true"
      @scroll = "scroll"
      ref="bscroll"
      class="wrapper"
    >
      <div class="content">
        <!-- 信息栏 -->
        <div class="userInfo" @click="gotoUserInfo">
          <div class="img">
            <img :src="userInfo.avatarUrl" alt="" />
            <div>{{ userInfo.nickname }}</div>
          </div>
          <div><p class="iconfont icon-icon-right"></p></div>
        </div>
        <!-- <div class="card" style="height: 150px"></div> -->
        <!-- 我的喜欢 -->
        <like-music></like-music>
        <!-- 控制栏 -->
        <ul class="cultor" :class="fixed?'fixed':''" ref="dan">
          <li
            v-for="(item, index) in tabArr"
            :key="index"
            @click="checkTab(index)"
            :class="checkIndex == index ? 'red' : ''"
          >
            {{ item.name }}
          </li>
        </ul>
        <!-- 创建歌单 -->
        <music-dan ></music-dan>
         <!-- <div class="card" style="height: 150px"></div> -->
      </div>
    </Bscroll>

    <!-- 底部导航 -->
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import Bscroll from '../../components/Bscroll/Bscroll.vue'
import NavBar from "../../components/NavBar/NavBar.vue";
import MainTabBar from "../../components/TabBar/MainTabBar.vue";
import LikeMusic from "./MyPageComp/LikeMusic.vue";
import MusicDan from "./MyPageComp/MusicDan.vue";
export default {
  components: {
    MainTabBar,
    NavBar,
    LikeMusic,
    MusicDan,
    Bscroll
  },
  data() {
    return {
      userInfo: {},
      fixed:false,
      tabArr: [
        { name: "创建歌单", idx: 0 },
        { name: "收藏歌单", idx: 1 },
        { name: "歌单助手", idx: 2 },
      ],
      checkIndex: 0,
    };
  },
  mounted() {
    //用户信息
    this.userInfo = JSON.parse(this.$store.state.userInfo);
    console.log(this.userInfo);
  },
  methods: {
    gotoUserInfo() {
      this.$router.push("/usermain/" + this.userInfo.userId);
    },
    // 切换tab栏控制滚动
    checkTab(i) {
      this.checkIndex = i;
        console.log( this.$refs.dan.offsetTop)
        this.$refs.bscroll.refresh()
        if(i==0){
            this.$refs.bscroll.scrollTo(0,-this.$refs.dan.offsetTop)
        }else{
            this.$refs.bscroll.scrollTo(0,-this.$refs.dan.offsetTop + -100)
        }
    },
    scroll(pos){
   
    }
  },
};
</script>

<style scoped>
    .wrapper{
        height: calc(100vh - 60px);
        overflow: hidden;
        /* min-height: calc(120vh); */
    }
    .content{
        padding-bottom: 40px;
        /* margin-bottom: 60px; */
    }
.my {
  padding: 2.75rem 10px;
  background-color: #f7f7f7;
  height: 100%;
}
.userInfo {
  width: 100%;
  height: 60px;
  margin: 10px 0;
  /* background-color: #ccc; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
}
.userInfo .img {
  display: flex;
  align-items: center;
}
.userInfo .img img {
  width: 50px;
  border-radius: 50%;
  height: 50px;
  margin-right: 10px;
}
.cultor {
/* background-color: #e3e3e3; */
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 16px;
}
.fixed{
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 9999;
}
.red {
  color: red;
}
</style>