<template>
        
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="item in banner" :key="item.tagetId" @click="bannerImg(item)">
                        <img :src="item.pic" alt="">
                        <div class="typeTitle">{{item.typeTitle}}</div>
                </van-swipe-item>
        </van-swipe>
</template>
<script>
//父组件 Home
import {Swipe,SwipeItem } from 'vant';
// import func from 'vue-editor-bridge';
export default {
    props:{
       banner:{
            type:Array,
            default:function(){
                return []
            }
        }, 
    },
     components: {  
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
  },
  methods:{
      bannerImg(item){
          console.log(item)
      }
  }
}
</script>

<style scoped>
.my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        border-radius: .8rem;
        background-color: #39a9ed;
        position: relative;
    }
   .my-swipe .van-swiper-item2{
       color: #fff;
        font-size: 20px;
        height: 12.5rem;
        line-height: 150px;
        text-align: center;
        border-radius: .8rem;
        background-color: #ccc;
        position: relative;
   }
.my-swipe .van-swipe-item img{
        position: absolute;
        width:100%;
        left: 0;
        height: 150px;
        border-radius: .8rem;
    }
</style>