<template>
    <div>
        <div class="card">
             <van-swipe class="my-swipe"  :stop-propagation="false" indicator-color="white" @change="onChange" ref="swipe">
                <van-swipe-item>0</van-swipe-item>
                <van-swipe-item class="swiper-item">
                        <music-list-item :musicList="hotSong" :showType="1"></music-list-item>
                </van-swipe-item>
                <van-swipe-item>2</van-swipe-item>
                <van-swipe-item>3</van-swipe-item>

            </van-swipe>
        </div>
    </div>
</template>

<script>
import {Swipe,SwipeItem } from 'vant';
import MusicListItem from './MusicListItem.vue'
export default {
    props:{
        hotSong:{
            type:Array,
            default:function(){
                return []
            }
        },
          //监听轮播点击对应标签滚动到对应项
        swipeTo:{
            type:String,
            default:function(){
                return ''
            }
        }
    },
    mounted(){
    },
    components: {  
        MusicListItem,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
  },
  methods:{
      //轮播获取索引
      onChange(index){
          console.log(index)
          this.$emit('bannerIndex',index)
          
      }
  },
  watch:{
      swipeTo(){
          //监听轮播点击对应标签滚动到对应项
        this.$refs.swipe.swipeTo(this.swipeTo);
      }
  }
}
</script>

<style>
    .van-swipe-item{
       
        
     
    }
</style>