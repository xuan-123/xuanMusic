<template>
    <div>
        <div class="titleChunk">
            <div class="titleChunkTitle">
                <p style="color:#000">热搜榜</p>
                <!-- <p>播客榜</p> -->
            </div>
            <div class="rightjumpChunk"><span class="iconfont icon-down-copy"></span> 播放</div>
        </div>
        <div class="card">
            <van-swipe class="my-swipe"  indicator-color="white">
                <van-swipe-item >
                    <div v-for="(item,index) in hotsList" :key="item.id" class="swiper-div" v-show="index<showListNum">
                            <p :class="[index<3 ? 'fontCol' : '']" class="pType" @click="searchListFun(item.searchWord)"><span :class="[index<3 ? 'indexCol' : '']">{{index + 1}}</span>{{item.searchWord}} <img :src="item.iconUrl" alt="" v-show="item.iconUrl"></p>
                    </div>
                    <div @click="clickShowMust" v-show="showClick" class="more">点击展示更多<span class="iconfont icon-jiantou-copy"></span></div>
                </van-swipe-item>
            </van-swipe>    
        </div>
        <ul class="searchpre" v-show="showSongList">
            <li v-for="(item,index) in searchLists" :key="item.id" v-show="index<=10" @click="goSingDetail(item)">
                <p class="iconfont icon-sousuo"></p>
                <p>{{item.name}}</p>
            </li>
        </ul>
        <div class="card">
            <div class="titleChunkTitle">
                <p style="color:#000">音乐专区</p>
            </div>
            <div class="singcard">
                <div class="singer" @click="goSingList">
                <p>歌手分类</p>
            </div>
            <div class="songer">
                <p>曲风分类</p>
            </div>
            </div>
        </div>

    </div>
</template>

<script>
import {Swipe,SwipeItem } from 'vant';
export default {
    components: {  
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
    },
    data(){
        return {
            hotsList:[],
            showListNum:10,
            showClick:true,
            showSongList:false,
            searchLists:[]
        }
    },
    mounted(){
        this.hotSearchList()
    },
    methods:{
         async hotSearchList(){
            let res = await this.$request('/search/hot/detail',{})
            console.log(res.data.data)
            this.hotsList = res.data.data
        },
        clickShowMust(){
            this.showListNum = 20
            this.showClick = false
        },
        goSingList(){
            this.$router.push('/searchsinger')
        },
        searchListFun(item){
            //页面内才调用
             this.$request('/cloudsearch',{keywords:item}).then(res=>{
                 console.log(res)
             this.searchLists =res.data.result.songs 
             if(this.searchLists.length>1){
                this.showSongList=true
             }
            //  console.log(this.searchLists)
        })
        },
        //去音乐详细页
        goSingDetail(item){
            console.log(item.id)
            this.showListFlag = true
            this.showSongList = false
            this.searchSong = item.name
            this.$router.replace('/searchsong/searchinfo/' + item.name)
        }
    }
}
</script>

<style scoped>
    .titleChunk{
        margin: 0 .625rem;
    }
    .titleChunkTitle{
        display: flex;
    }
    .titleChunkTitle p{
        font-size:1rem;
        margin-right: .3125rem;
        color: #666;
    }
    .swiper-div{
        width: 100%;
        background-color: #ccc;
        font-size: .875rem;
        color: #999;

    }
    .swiper-div .pType{
        width: 50%;
        float: left;
        padding: .3125rem 0;
        display: flex;
    }
    .swiper-div span{
        margin: 0 .3125rem;
    }
    .swiper-div img{
        width: 1.25rem;
        height: .625rem;
        margin-top: .3125rem;
        margin-left: .625rem;
    }
    .more{
        width: 6.25rem;
        /* height: 2.25rem; */
        position: relative;
        left: 50%;
        margin-left: -3.1rem;
        font-size: .75rem;
        z-index: 999;
        color: #000;
    }
    .indexCol{
        color: red;
    }
    .fontCol{
        color: #000;
    }
    .singcard div{
        width: 100%;
        height:3.125rem;
        background-color: #ccc;
        border-radius: .625rem;
        margin-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
    }   
    .singer{
        background-image: linear-gradient(to right, rgba(70, 50, 38, 0.637) , rgb(202, 181, 152));
    }
    .songer{
        background-image: linear-gradient(to right, rgba(44, 94, 160, 0.637) , rgb(154, 167, 226));
    }
    .van-swipe-item{
        line-height: normal!important;;
    }
     .searchpre {
        width: 100vw;
        height: 100vh;
        background-color: #fff;
        position: fixed;
        top: 2.75rem;
        z-index: 999;
    }
    .searchpre li{

        display: flex;
        align-items: center;
        padding: .625rem .625rem;
        height:1.5625rem;
        /* background-color: red; */
        border-bottom: 1px solid #f3f3f3;
        font-size: .875rem;
    }
    .searchpre li p{
        margin-right: .625rem;
    }
</style>