<template>
    <div class="personalized">
        <div class="titleChunk">
            <h3>{{title}}</h3>
            <div class="rightjumpChunk">更多<span class="iconfont icon-icon-right"></span></div>
        </div>
        <div :class="hancoun == 1? 'bottom' :'bottom2'" >
            <div class="botItem" v-for="item in personalizeds" :key="item.id" @click="getGaDan(item)">
                <p class="playCount">{{item.playCount|countNum}}</p>
                <img class="botImg" :src="item.picUrl">
                <span class="botFont">{{item.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // props:['personalizeds','title','hancoun']
    props:{
        personalizeds:{
            type:Array,
            default:[]
        },
        title:{
            type:String,
            default:''
        },
        hancoun:{
            type: Number,
            //如果传进来是1则可以左右滑动，如果是2则上下展示 不可滑动
            default: 1
        }
    },
    methods:{
        getGaDan(item){
            console.log(item)
            //  this.$store.commit('getMusicDanMessage',item)

        this.$router.push('/musicdanpage/'+ 5269805887)
        }
    }
}
</script>

<style scoped>
    .personalized{
        
    }
   
    
    .bottom{
        height:8rem;
        padding: .3125rem 0 0 .3125rem;
        box-sizing: border-box;
        width:100%;
        overflow-x: auto;
        overflow-y: hidden;
        white-space:nowrap;
    }
     .bottom2{
        height:16rem;
        padding: .3125rem 0 0 .5125rem;
        box-sizing: border-box;
        width:100%;
        
    }
    .botItem{
        margin-right: 1rem;
        height: 7.25rem;
        width: 6.25rem;
        display: inline-block;  
        position: relative;
    }
    .botImg{
        width: 6.25rem;
        height: 6.25rem;
        border-radius: .65rem;
    }
    .botFont{
        font-size: .25rem;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; 
        -webkit-box-orient: vertical;
    }
    .playCount{
        /* background-color: rgb(124, 117, 117); */
        background-color:rgba(12, 1, 1, 0.2);
        border-radius: .625rem;
        padding: 0 .325rem;
        position: absolute;
        top: .3125rem;
        right: .3125rem;
        font-size: .75rem;
        color: #fff;
    }
</style>