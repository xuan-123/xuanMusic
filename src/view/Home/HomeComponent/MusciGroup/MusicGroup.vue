<template>
    <div class="group">
         <nav-bar>
            <div slot="left"><p class="iconfont icon-fanhui" @click="$router.go(-1)"></p></div>
            <div slot="center">歌单广场</div>
            <div slot="right"><p class="iconfont icon-saomiao"></p></div>
        </nav-bar>
        <div class="rowLi">
            <ul>
                <li :class="currentDan==item.index?'red':''" v-for="item in myGroup"  :key="item.index" @click="checkDan(item)">{{item.name}}</li>
            </ul>
            <div class="menu" @click="goEditGroup">菜单</div>
        </div>
        <ul class="content">
            <li v-for="item in playlists" :key="item.id" @click="goDetail(item)">
                <img :src="item.coverImgUrl" alt="">
                <p>{{item.name}}</p>
                <p class="count">{{item.playCount|handleNum}}</p>
            </li>
          
        </ul>
    </div>
</template>

<script>
import NavBar from '../../../../components/NavBar/NavBar.vue'

export default {
    components:{
        NavBar
    },
    mounted(){
        this.myGroup = this.$store.state.defaultGroup
        this.getPlaylist(this.myGroup[0].name)
     
    },
    data(){
        return{
            myGroup:[],
            currentDan:0,
            playlists:[]
        }
    },
    methods:{
        checkDan(item){
            console.log(item)   
            this.currentDan = item.index
            this.getPlaylist(item.name)
  
        },
        goEditGroup(){
            this.$router.push('/editgroup')
        },
        getPlaylist(name){
             this.$request("/top/playlist", {cat:name}).then((res) => {
            console.log(res.data.playlists);
            this.playlists = res.data.playlists
        });
        },
        goDetail(item){
            this.$store.commit('getMusicDanMessage',item)
      // return
        this.$router.push('/musicdanpage/'+ item.id)
        }
           
    }
}
</script>

<style scoped>
    .group{
        padding-top: 44px;
    }
    .rowLi{
        /* background: #ccc; */
        display: flex;
        height: 30px;
        align-items: center;
    }
    .rowLi ul{
        flex: 9;
        border-right: 1px solid #000;
        margin: 0 5px;
        display: flex;
         overflow-x: auto;
        overflow-y: hidden;
        white-space:nowrap;
        font-size: 12px;


    }
    .rowLi li{
        display: inline-block;
        margin: 0 10px;
        color: rgb(73, 73, 73);
        
    }
    .menu{
        flex: 1;
        font-size: 12px;
    }
    .rowLi .red{
        color: red;
    }
    .content{
        display: flex;
        justify-content: space-around;
        
        flex-wrap: wrap;
    }
    /* .content:after{
            content: "";
            width: 32%;
        } */
    .content li{
        flex: 32%;
        text-align: center;
        margin-bottom: 10px;
        position: relative;
    }
    .count{
        position: absolute;
        top: 5px;
        right: 10px;
        color: #fff;
        background-color: #ccc;
        border-radius: 5px;
        background:rgba(0,0,0,.3)
    }
    .content p{
        font-size: 12px;
        text-align: left;
        padding: 0 4px;
        overflow: hidden;    text-overflow: ellipsis;    display: -webkit-box;    -webkit-line-clamp: 2;    -webkit-box-orient: vertical;
    }
    .content img{
        width: 30vw;
        border-radius: 5px;

    }
</style>