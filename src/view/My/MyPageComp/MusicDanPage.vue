<template>
    <div style="padding-top:44px">
        <nav-bar>
            <div slot="left"><p class="iconfont icon-fanhui" @click="$router.go('-1')"></p></div>
            <div slot="center">歌单</div>
            <div slot="right"><p class="iconfont icon-saomiao"></p></div>
        </nav-bar>
        <div class="top">
            <div class="img">
                <img :src="musicDanMessage.coverImgUrl" alt="">
            </div>
            <div class="pre">
                <p>{{musicDanMessage.name}}</p>
                <div class="me">
                    <img class="img2" :src="musicDanMessage.creator.avatarUrl" alt="">
                    <p>{{musicDanMessage.creator.nickname}}</p>
                    <p >--</p>
                </div>
            </div>
        </div>
        <music-list-item :musicList="musicDanList " :showType="2"></music-list-item>
    </div>
</template>

<script>
import NavBar from '../../../components/NavBar/NavBar.vue'
import MusicListItem from '../../../components/MusicList/MusicListItem2.vue'

export default {
    components:{
        MusicListItem,NavBar
    },
    data(){
        return{
            musicDanList:[],
            musicDanMessage:{}
        }
    },
    mounted(){
        this.musicDanMessage = this.$store.state.musicDanMessage
        console.log(this.musicDanMessage)
        this.getMusicDanList()
    },
    methods:{
        async getMusicDanList(){
            let res = await this.$request("/playlist/detail", {
                id: this.$route.params.id,
                cookie: encodeURIComponent(
                JSON.parse(window.sessionStorage.getItem("cookie"))
                ), //报301的添加cookie
            });
            this.musicDanList = res.data.playlist.tracks
        }
    }
}
</script>

<style>
    .top{
        padding: 20px 10px;
        box-sizing: border-box;
        /* background-color: #ccc; */
        display: flex;
    }
    .pre{
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: 14px;
    }
    .me{
        display: flex;
        font-size: 12px;
        align-items: center;
        font-size: #9c9c9c;
    }
    .img img{
        width: 80px;
        height: 80px;
        border-radius: 10px;
    }
    .img2{
        width:20px ;
        height: 20px;
        border-radius: 50%;
        margin-right: 10px;
        }
</style>