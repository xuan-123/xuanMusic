<template>
       <div>
            <div class="titleChunk">
            <h3>{{title}}</h3>
            <div class="rightjumpChunk">播放<span class="iconfont icon-icon-right"></span></div>
        </div>
        <van-swipe :stop-propagation="false" class="my-swipe"  indicator-color="white">
                <van-swipe-item v-for="item in recommendbanner" :key="item.id"  class="swiper-item">
                        <div v-for="items in item" :key="items.id" class="itemFlex" @click="bannerMusic(items)">
                            <img :src="items.al.picUrl" alt="">
                            <div class="songMsg">
                                <div class="top">
                                    <p class="name">{{items.name}}</p><p class="author">_{{items.ar[0].name}}</p>
                                </div>
                                <div class="bottom">{{items.id}}</div>
                            </div>
                        </div>
                </van-swipe-item>
            </van-swipe>
       </div>
</template>
<script>
//父组件 Home
import {Swipe,SwipeItem } from 'vant';
export default {
    props:{
       recommendbanner:{
            type:Array,
            default:function(){
                return []
            }
        }, 
        title:{
            type:String,
            default:function(){
                return ''
            }
        }
    },

     components: {  
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
  },
  methods:{
      bannerMusic(item){
        //   window.sessionStorage.setItem('linsinMusic',JSON.stringify(item))
        this.$store.commit('addMusic',JSON.stringify(item))

          this.$router.push('/lisinemusic/'+ item.id)
      }
  }
}
</script>

<style >
.my-swipe .van-swipe-item {
        color: #fff;
        font-size: .875rem;

        line-height: 3.125rem;
        background-color: #fff;
}
    .swiper-item{
        height:12.5rem;
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .itemFlex{
        flex: 1;
        display: flex;
        align-items: center;
        border-bottom: 1px solid hsl(0, 0%, 95%);
        /* background-color: red; */

    }
    .swiper-item .itemFlex img{
        width: 3.5rem ;
        height: 3.5rem ;
        float: left !important;
        position: unset;
        float: left;
        margin-left: .625rem;
        margin-right: .625rem;
    }
    .songMsg{
        color: #000;
        float: left;
        height:3.5rem;
        padding-top: .25rem;
        box-sizing:border-box;
    }
    .songMsg div{
        width: 100%;
        height: 1.5rem;
        line-height: 1.5rem;
        text-align: left;
    }
    .top p{
        float: left;
    }
    .top .name{
        font-size: 1rem;
    }
    .top .author{
        font-size: .75rem;
        color: #c3c3c3;
    }
    .songMsg .bottom{
        font-size: .75rem;
        color: #c3c3c3;
    }
    
</style>