<template>
    <div class="searchsong">
        <nav-bar>
            <div slot="left"><p class="iconfont icon-fanhui" @click="goBack"></p></div>
            <div slot="center"><input type="text" id="searchipt" v-model="searchSong"  class="ipt"  placeholder="浮夸"  /><span v-show="showCuo" @click="cuo" class="iconfont icon-cuo span"></span></div>
        </nav-bar>
        <ul class="searchpre" v-show="showSongList">
            <li v-for="(item,index) in searchList" :key="item.id" v-show="index<=10" @click="goSingDetail(item)">
                <p class="iconfont icon-sousuo"></p>
                <p>{{item.name}}</p>
            </li>
        </ul>
        <keep-alive include="singerdetail">
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
import NavBar from '../NavBar/NavBar.vue'
export default {
    components:{
        NavBar
    },
    mounted(){
        $('#searchipt').focus()
    },
    data(){
        return {
            searchSong:'',
            searchList:[],
            showCuo:false,
            showSongList:false,
            showListFlag:false
        
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        cuo(){//搜索错号
            this.searchSong = '';
            this.showSongList=false
            
        },
        //搜索列表
        searchListFun(){
            //页面内才调用
             this.$request('/cloudsearch',{keywords:this.searchSong}).then(res=>{
                 console.log(res)
             this.searchList =res.data.result.songs 
             if(this.searchList.length>1){
                this.showSongList=true
             }
            //  console.log(this.searchList)
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
       
    },
    watch:{
        searchSong(){
            if(this.searchSong != ''){
                this.showCuo = true
            }else{
                this.showCuo = false
                this.showSongList=false

            }
            if(this.showListFlag){
                return false
            }else{
                this.searchListFun()

            }

            // let timer 
            // if(timer) clearTimeout(timer)
            // timer = setTimeout(()=>{
            //     timer = null
            // },500)
        }
    }
}
</script>

<style scoped> 
    .searchsong{
        padding-top: 2.75rem;
    }
    #searchipt{
        position: relative;
    }
    .span{
        position: absolute;
        right: 3.625rem;
        top: 0;
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