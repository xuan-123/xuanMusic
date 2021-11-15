<template>
    <div class="daymusic">
         <nav-bar>
            <div slot="left"><p class="iconfont icon-fanhui" @click="$router.go(-1)"></p></div>
            <div slot="center">每日推荐</div>
            <div slot="right"><p class="iconfont icon-saomiao"></p></div>
        </nav-bar>
        <MusicListItem2 :musicList="dailySongs" :showType="1"/>
    </div>
</template>

<script>
import NavBar from '../../../components/NavBar/NavBar.vue'
import MusicListItem2 from '../../../components/MusicList/MusicListItem2.vue'
export default {
    components:{
        MusicListItem2,NavBar
    },
    mounted(){
        this.getDayMusic()
    },
    data(){
        return{
            dailySongs:[]
        }
    },
    methods:{
        getDayMusic(){
            this.$request("/recommend/songs", {
          cookie: encodeURIComponent(
            JSON.parse(window.sessionStorage.getItem("cookie"))
          ),
        }).then((res) => {
          console.log(res.data.data.dailySongs);
          this.dailySongs = res.data.data.dailySongs
        });
        }
    }
}
</script>

<style scoped>
    .daymusic{
        padding-top: 44px;
    }
</style>