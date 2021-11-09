<template>
    <div class="listlike">
        <nav-bar>
            <div slot="left"><p class="iconfont icon-fanhui" @click="$router.go(-1)"></p></div>
            <div slot="center">我的喜欢</div>
            <div slot="right"></div>
        </nav-bar>
        <ul>
            <span >
                <li v-for="(item,index) in $store.state.likeList" :key="item">
                <!-- {{item}} -->
                <!-- 加载组件，用于展示不同列表组件 -->
                <like-musci-item  :id="item" :idx='index' ></like-musci-item>
            </li>
            </span>
        </ul>
    </div>
</template>

<script>
import NavBar from '../../../components/NavBar/NavBar.vue'
import LikeMusciItem from './LikeMusciItem.vue'
export default {
    data(){
        return{
            
        }
    },
    components:{
        LikeMusciItem,NavBar
    }
}
</script>

<style >
    .listlike{
        padding-top: 44px;
    }

</style>