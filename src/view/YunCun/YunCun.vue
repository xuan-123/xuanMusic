<template>
    <div class="mv">
        
        <nav-bar>
            <div slot="left" ></div>
            <div slot="center">MV排行榜</div>
            <div slot="right"></div>
        </nav-bar>
        <progress style="width:400px;" max="100" :value="value"></progress>

        <!-- 列表 -->
            <Bscroll 
            :probeType = 3
            :data="mvList" 
            :click = true
            :scrollX = true
            class="wrapper">
            <div class="content"> 
                     <ul>
            <li class="list" v-for="(item,index) in mvList" :key="item.mv.id" @click="mvClick(item.mv.id)">
                <img :src="item.cover" alt="">
                <div class="title">
                    <div class="left">{{index + 1}}</div>
                    <div class="right">
                        <div class="top">{{item.name}}</div>
                        <div class="bottom">{{item.artistName}}</div>
                    </div>
                </div>
            </li>
        </ul>
            </div> 
        </Bscroll>
        <!-- 底部导航 -->
        <main-tab-bar></main-tab-bar>
    </div>
</template>

<script>
import NavBar from '../../components/NavBar/NavBar.vue'
import Bscroll from '../../components/Bscroll/Bscroll.vue'

import MainTabBar from '../../components/TabBar/MainTabBar.vue'

export default {
    components:{
        MainTabBar,NavBar,Bscroll
    },
    created(){

    },
    mounted(){
        this.getDatas()

    },
    data(){
        return {
            mvList:[],
            mvUrl:'',
            value:0
        }
    },
    methods:{
        
        //获取MV列表
          getDatas(){
            let timer = setInterval(() => {
                this.value++
            }, 50);
            this.$request('/top/mv?limit=10',{
                cookie:encodeURIComponent(JSON.parse(window.sessionStorage.getItem('cookie'))) //报301的添加cookie
            }).then(res=>{
                console.log(res)
            if(res.data.data){
                this.value = 100
                clearInterval(timer)
            }
            this.mvList = res.data.data
            })
            
        },
        mvClick(id){
            this.$router.push('/mv/' + id )
            
        }
    }
}
</script>

<style scoped>
    .mv{
        padding-top: 44px;
        
    }
    .list{
        /* background-color: #ccc; */
        width: 100vw;
        padding: 0 10px;
        box-sizing: border-box;
        margin-bottom: 10px;
        margin-top: 10px;
    }
    .list img{
        width: 100%;
        height: 200px;
    }
    .title{
        /* background-color: skyblue; */
        display: flex;
    }
    .title .left{
        /* color: red; */
        margin-right: 20px;
        font-size: 22px;
        color: red;
    }
    .title .top{
        font-size: 14px;
        margin-bottom: 6px;
        
    }
    .title .bottom{
        font-size: 12px;
        color: #ccc;
    }
    .wrapper{
        height: calc(100vh - 60px);
        overflow: hidden;
  
        /* min-height: calc(120vh); */
    }
    .content{
        padding-bottom: 40px;
        margin-bottom: 60px;
    }
</style>