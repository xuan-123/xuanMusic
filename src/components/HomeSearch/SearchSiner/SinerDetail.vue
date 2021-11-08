<template>
    <div class="sinerDetail">
        <!-- 用户信息 -->
        <nav-bar>
            <div slot="left"><p class="iconfont icon-fanhui" @click="goBack"></p></div>
            <div slot="center">{{name}} </div>
        </nav-bar>
        <!-- 歌手照片 -->
        <img :src="artist.img1v1Url" alt="">
                <!-- 歌手信息 -->
        <div class="card siner">
            <div class="h2">{{name}}</div>
            <div class="ycsiner">原创歌手{{name}}</div>
        </div>        <!-- 歌手信息 -->
      <!-- 轮播标签 -->
        <ul class="bannerTitle" :class="navBarWrap?'navBarWrap':''" id="bannerTitle" ref="bannerTitle">
            <li v-for="item in bannerMessage" :key="item.name" :class="item.addClass? 'addClassLi' :''" 
            @click='getCurrentTitle(item.index)'>{{item.name}}</li>
        </ul>
        <Bscroll 
                :probeType = 3
                :click = true
                :data="artist" 
            class="wrapper">
            <div class="content">
        <!-- 歌曲列表 -->
        <music-list :hotSong="hotSongs" @bannerIndex="getBannerIndex" :swipeTo ="swipeTo"></music-list>
            </div>
        </Bscroll>
        
    </div>
</template>

<script>
import NavBar from '../../NavBar/NavBar.vue'
import MusicList from '../../MusicList/MusicList.vue'
import Bscroll from '../../Bscroll/Bscroll.vue'
export default {
    components:{Bscroll,
        NavBar,MusicList
    },
    data(){
        return{
            id:'',
            name:'',
            artist:'',
            hotSongs:[],
            bannerMessage:[
                {name:'主页',index:'0',addClass:true},
                {name:'歌曲',index:'1',addClass:false},
                {name:'专辑',index:'2',addClass:false},
                {name:'视频',index:'3',addClass:false},
            ],
            swipeTo:'',
            navBarWrap:false,
            BannerTitleSetoff:0
        
        }
    },
    created(){
        this.id = this.$route.params.id
        console.log(this.id)
        this.$nextTick(function(){
            this.getSingerDetail()
        })
    },
    mounted(){
        this.BannerTitleSetoff = this.$refs.bannerTitle.offsetTop //获取title栏距顶部的高度
        // console.log(this.$refs.bannerTitle.offsetTop -this.$refs.bannerTitle.offsetHeight)
        window.addEventListener('scroll',this.watchScroll)
    },
    methods:{
        watchScroll(){
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        //    console.log('_______________________________________')
        //     console.log(scrollTop)
        //     console.log(this.$refs.bannerTitle.offsetTop -this.$refs.bannerTitle.offsetHeight)
            //屏幕卷曲高度大于title栏距顶部的高度时就进行吸顶操作。
            if(scrollTop > (this.BannerTitleSetoff-20)){  //20是title栏的padding高度占用了要减去
                this.navBarWrap = true
            }else{
                this.navBarWrap = false
            }
        },
        goBack(){
            this.$router.go(-1)
        },
        //点击轮播标签
        getCurrentTitle(indexs){
          //监听轮播点击对应标签滚动到对应项
            this.swipeTo = indexs 
            for(var i = 0;i<this.bannerMessage.length;i++){
                if(this.bannerMessage[i].index == indexs){
                    this.bannerMessage[i].addClass = true
                }else{
                    this.bannerMessage[i].addClass = false
                }
            }
        },
        //滚动轮播让标签也动
        getBannerIndex(data){
            // console.log(data)
            for(var item in this.bannerMessage){
                if(this.bannerMessage[item].index == data){
                    this.bannerMessage[item].addClass = true
                }else{
                    this.bannerMessage[item].addClass = false
                }
            }
        },
        //获取歌手信息
       async getSingerDetail(){
          let res = await this.$request('/artists',{
               id:this.$route.params.id,
           })
           console.log(res)
            this.artist = res.data.artist
            this.name = res.data.artist.name
            this.hotSongs = res.data.hotSongs
        }
    }
}
</script>

<style scoped>
    .navBarWrap {
        position:fixed;
        top:2.75rem;
        z-index:999;
        width: 100vw;
        
      
    }
    .sinerDetail{
        padding: 2.75rem 0rem;
        background-color: #f3f3f3;
    }
    .siner{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .h2{
        margin: .625rem 0;
        font-size: 1.5rem;
        font-weight: 700;
    }
    img{
        width: 100vw;
        height: 16.25rem;
    }
    .ycsiner{

        font-size: .875rem;
        color: #666;
    }
    .bannerTitle{
        /* background-color: skyblue; */
        display: flex;
        justify-content: space-around;
        height: 2.0625rem;
        align-items: center;
        font-size: .875rem;
        background-color: #fff;
    }
    .bannerTitle li{
        /* background-color: red; */
        width: 10%;
        text-align: center;
        padding: .3125rem 0;
       
    }
    .navBarWrap li{
         width: 10%;
        text-align: center;
        padding: .3125rem 0;
    }
    .addClassLi{
         border-bottom: 3px solid red;
    }
    .wrapper{
        height: 350px;
        overflow: hidden;
    }
</style>