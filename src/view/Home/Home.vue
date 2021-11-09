<template>
    <div class="home">
        <nav-bar>
            <div slot="left"><p class="iconfont icon-tubiaolunkuohua_caidan"></p></div>
            <div slot="center"><input type="text"  @click="goSearchPage"  class="ipt"  placeholder="浮夸" /></div>
            <div slot="right"><p class="iconfont icon-saomiao"></p></div>
        </nav-bar>


       <Bscroll 
            :probeType = 3
            :data="recommendSongs2" 
            :click = true
            :scrollX = true
            :eventPassthrough = eventPassthrough
            class="wrapper">
            <div class="content"> 
                    <!-- 轮播图 -->
                    <div class="card">
                        <banner :banner="banners" ></banner>
                        <!-- 排行榜banner -->
                        <pai-banner :paibanner="paihangBanner"></pai-banner>
                    </div>
                    <!-- 推荐歌单 -->
                    <div class="card">
                        <personalized :personalizeds="personalized" :title="'推荐歌单'" :hancoun="1"></personalized>
                    </div>
                    <!-- 三首轮播音乐 -->
                    <div class="card" >
                        <banner-music :recommendbanner="recommendSongs2" :title="'相似推荐'"></banner-music>
                    </div>   
            </div> 
       </Bscroll>
    
       
        <!-- 底部导航 -->
        <main-tab-bar></main-tab-bar>
    </div>
</template>

<script>
import { Button } from 'element-ui';
import { Toast,Swipe,SwipeItem } from 'vant';
import NavBar from '../../components/NavBar/NavBar.vue'
import MainTabBar from '../../components/TabBar/MainTabBar.vue'
import Banner from './HomeComponent/Banner.vue'
import PaiBanner from './HomeComponent/PaiBanner.vue'
import Personalized from '../../components/MusicChunk/Personalized.vue'
import BannerMusic from './HomeComponent/BannerMusic.vue'
import Bscroll from '../../components/Bscroll/Bscroll.vue'
export default {
   
    components: {  
        NavBar,MainTabBar,Banner,PaiBanner,Personalized,
        BannerMusic,Bscroll,
        [Toast.name]: Toast,
        [Button.name]: Button,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
  },
  data(){
      return {
        eventPassthrough:'horizontal',
        userData:'',
        userImg:'',
        // show: false,
        banners:[],
        paihangBanner:[
            {
                name:'每日推荐',
                icon:'icon-dibiao'
            },
            {
                name:'私人FM',
                icon:'icon-zhang'
            },
            {
                name:'歌单',
                icon:'icon-shijian1'
            },
            {
                name:'排行榜',
                icon:'icon-biaoqian'
            },
            {
                name:'直播',
                icon:'icon-sevenday'
            },
            {
                name:'数字专辑',
                icon:'icon-duoren'
            },
            {
                name:'歌房',
                icon:'icon-xin'
            },
            {
                name:'游戏专区',
                icon:'icon-15tian'
            },
        ],
        personalized:[], //推荐歌单
        recommendSongs:[],
        recommendSongs2:[],
        flag:true

     }
  },

  mounted(){
    //   console.log(storageLocal)
    //    this.$request('user/playlist?uid=447982727',{}).then(res=>{
    //         console.log(res)
    //   })
    //获取用户登录状态
    // var token = sessionStorage.getItem('token')
    //获取轮播图
    this.getBanner()
   

    //获取推荐歌单
    this.getPersonalized()
    //获取推荐歌曲
    this.getRecommendSongs()
    //  this.init()
  },
    methods:{
        
        unLogin(){
            Toast.success('您已成功退出登录');
            window.sessionStorage.clear()
            this.$router.push('/login')
        },
        //搜索页
        goSearchPage(){
            // alert(1)
            this.$router.push('/searchsong')
        },
        async getDatas(){
            var res = await this.$request('/banner?type=2',{})
            this.banners = res.data.banners
            this.storageLocal.set('banners',this.banners)  
        },
        //轮播图，页面一进来就进行查值操作
         getBanner(){
           var bannersJson = this.storageLocal.get('banners')
            if(bannersJson){//判断本地存储是否有当前数据
                //如果当前时间减去set时存的时间 是否大于设置的过期时间1000为一秒
                //大于代表过期，重新走接口请求数据
                if(new Date().getTime() - bannersJson.time > 20000){
                    // 信息过期,重新发接口请求数据
                     console.log('信息过期')
                    this.getDatas()
                }else{
                    //不大于则直接取本地存储的数据
                     this.banners = bannersJson.data
                }
            }else{
                this.getDatas()//本地存储没有当前数据重新请求接口
            }
        },
        // 推荐歌单
        async getPersonalized(){
           let res = await this.$request('/personalized?limit=6',{})
           console.log(res.data)
           this.personalized = res.data.result
        },
        //推荐歌曲
        async getRecommendSongs(){
           let res = await this.$request('/artist/top/song?id=6452',{})
           this.recommendSongs = res.data.songs
            var len = Math.ceil(this.recommendSongs.length/3)
            for (var i = 0; i < len; i++) {
                this.recommendSongs2.push(this.recommendSongs.splice(0, 3))
            }
        },
        // bannerImg(item){
        //     console.log(item)
        // }
    }
}
</script>

<style scoped>
    .home{
        height: 100%;
        width: 100vw;
        padding: 2.75rem 0;
        
        /* box-sizing: border-box; */
    }
    .wrapper{
        height: calc(100vh - 60px);
        overflow: hidden;
  
        /* min-height: calc(120vh); */
    }
    .content{
        margin-bottom: 60px;
    }
 
    
</style>