<template>
    <!-- 音乐列表组件
        musicList:"对应展示的列表数据数组"
        showType:"前边展示图片还是索引，1:索引 2:'图片'"
     -->
    
    <div >
        <div class="listitem" v-for="(item,index) in musicList" :key="item.id">
            <p class="index" v-show="showType=='2'"> {{index + 1}}</p>
            <!-- <img alt="" class="singImg" v-show="showType=='2'"> -->

            <!-- <img>picUrl -->
            <div class="name">
                <div class="singName" @click="getSingDetail(item)">{{item.name}}<span v-show="item.artists[0]">({{item.artists[0].name}})</span></div>
                <div class="singer"><span class="sq">SQ</span>{{item.name}} - {{item.name}}</div>
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
            console.log(item.id)
            this.$request('/song/detail',{ids:item.id}).then(res=>{
                 console.log(res)
                 //未用await为异步，跳转放到接口内部，要不每次异步会先走跳转再存值
                window.sessionStorage.setItem('linsinMusic',JSON.stringify(res.data.songs[0]))
                this.$router.push('/lisinemusic/'+ item.id)
                console.log('1')
            })
                console.log('2')
        },
        getSingUpDetail(item){
            console.log(item)
        },
      
    },
}
</script>

<style scoped>

     .listitem{
        /* width: 100vw; */
        /* background-color: #ccc; */
        display: flex;
        margin: 15px 0;
        height: 2.5rem;
        font-size: .875rem;
        align-items: center;
    }
    .index{
        /* background-color: red; */
        /* height: 100%; */
        flex: 1;
        text-align: center;
    }
   .name{
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
    .wei{
 
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