<template>
    <div>
        <music-list-item :musicList="searchList" :showType="2"></music-list-item>
    </div>
</template>

<script>
import MusicListItem from '../../MusicList/MusicListItem2.vue'
export default {
    components:{
        MusicListItem
    },
    data(){
        return {
            searchList:[]
        }
    },
    mounted(){
        console.log(this.$route.params.id)
        this.searchListFun()
    },
    methods:{
        searchListFun(){
            //页面内才调用
             this.$request('/search',{keywords:this.$route.params.id}).then(res=>{
                 console.log(res)
             this.searchList =res.data.result.songs 
            //  console.log(this.searchList)
            })
        }
    }
}
</script>

<style>

</style>