<template>
    <!-- 音乐列表组件
        musicList:"对应展示的列表数据数组"
        showType:"前边展示图片还是索引，1:索引 2:'图片'"
     -->
    
    <div >
        <div class="listitem" v-for="(item,index) in musicList" :key="item.id">
            <p class="index" v-show="showType=='1'"> {{index + 1}}</p>
            <img v-lazy="item.al.picUrl" alt="" class="singImg" v-show="showType=='2'">
            <!-- <img>picUrl -->
            <div class="name">
                <div class="singName" @click="getSingDetail(item)">{{item.name}}<span v-show="item.alia[0]">({{item.alia[0]}})</span></div>
                <div class="singer"><span class="sq">SQ</span>{{item.ar[0].name}} - {{item.al.name}}</div>
            </div>
            <div class="wei" @click="getSingUpDetail(item)">
                <span class="icon iconfont icon-tubiaolunkuohua_caidan"></span>
            </div>
        </div>
       
       <!-- 弹起信息页 -->
       <div class="diaoPage">

       </div>
    </div>
</template>

<script>
export default {
    props:{
        musicList:{
            type:Array,
            default:[]
        },
        showType:{
            type:Number,
            default:1  //1:只展示索引，2:展示图片
        }
    },
    methods:{
        getSingDetail(item){
            console.log(item)
            // window.sessionStorage.setItem('linsinMusic',JSON.stringify(item))
            this.$store.commit('addMusic',JSON.stringify(item))
            this.$router.push('/lisinemusic/'+ item.id)
        },
        getSingUpDetail(item){
            console.log(item)
        }
    },
}
</script>

<style scoped>

     .listitem{
        /* width: 100vw; */
        /* background-color: #ccc; */
        display: flex;
        margin-bottom: 10px;
        height: 2.5rem;
        font-size: .875rem;
        align-items: center;
    }
    .van-swipe-item .index{
        /* background-color: red; */
        /* height: 100%; */
        flex: 1;
        text-align: center;
    }
   .van-swipe-item .name{
       /* background-color:red!important; */
       flex: 6;
       display: flex;
       flex-direction: column;
       overflow: hidden;
       flex-wrap: none;
    }
    .name .singName{
        
    }
    .name .singer{
        font-size: .75rem;
        color: #666;
    }
    .van-swipe-item .wei{
 
         flex: 1;
        text-align: center;
    }
    .singImg{
        width: 1.875rem;
        height: 1.875rem;
        margin-right: 5px;
    }
    .sq{
        display: inline-block;
        border: 1px solid red;
        border-radius: .1875rem;
        color: red;
        font-size: .75rem;
        padding: 0 .0625rem;
        margin-right: .225rem;
        height: .875rem;
    }
     
</style>