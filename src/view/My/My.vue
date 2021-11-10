<template>
    <div class="my">
         <nav-bar>
            <div slot="left"><p class="iconfont icon-tubiaolunkuohua_caidan"></p></div>
            <div slot="center">{{userInfo.nickname}}</div>
            <div slot="right"><p class="iconfont icon-saomiao"></p></div>
        </nav-bar>
        <!-- 信息栏 -->
        <div class="userInfo" @click="gotoUserInfo">
            <div class="img">
                <img :src="userInfo.avatarUrl" alt="">
                <div>{{userInfo.nickname}}</div>
            </div>
            <div><p class="iconfont icon-icon-right"></p></div>
        </div>
        <!-- 我的喜欢 -->
        <like-music></like-music>
        <!-- 底部导航 -->
        <main-tab-bar></main-tab-bar>
    </div>
</template>

<script>
import NavBar from '../../components/NavBar/NavBar.vue'
import MainTabBar from '../../components/TabBar/MainTabBar.vue'
import LikeMusic from './MyPageComp/LikeMusic.vue'
export default {
    components:{
        MainTabBar,NavBar,LikeMusic
    },
    data(){
        return{
            userInfo:{}
        }
    },
    mounted(){
        //用户信息
       this.userInfo = JSON.parse(this.$store.state.userInfo)
       console.log(this.userInfo)

    },
    methods:{
        gotoUserInfo(){
            this.$router.push('/usermain/'+ this.userInfo.userId)
        }
    }



}
</script>

<style scoped>
    .my{
        padding:2.75rem 10px;
        background-color: #f7f7f7;
        height: 100vh;
    }
    .userInfo{
        width: 100%;
        height:60px;
        margin: 10px 0;
        /* background-color: #ccc; */
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        box-sizing: border-box;
    }
    .userInfo .img{
        display: flex;
        align-items: center;
    }
     .userInfo .img img{
        width: 50px;
        border-radius: 50%;
        height: 50px;
        margin-right: 10px;
    }
</style>