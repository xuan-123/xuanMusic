<template>
    <div class="followed">
        <nav-bar>
            <div slot="left"><p class="iconfont icon-fanhui" @click="$router.go(-1)"></p></div>
            <div slot="center">{{follFlag}}</div>
            <div slot="right"></div>
        </nav-bar>
       
        <Bscroll 
            :probeType = 3
            :click = true
            :scrollX = true
            class="wrapper">
             <ul class="content">
                <li class="li" v-for="(item) in followeds" :key="item.nickname">
                    <img :src="item.avatarUrl" alt="">
                    <p class="name">{{item.nickname}}</p>
                </li>
        </ul>
       </Bscroll>
    </div>
</template>

<script>
import NavBar from '../../../components/NavBar/NavBar.vue'
import Bscroll from '../../../components/Bscroll/Bscroll.vue'
export default {
    components:{
        NavBar,Bscroll
    },
    created(){
        // console.log(this.$route.params)
      
    },
    mounted(){
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        console.log(this.userInfo)
         if(this.$route.params.id == 0){
            this.follFlag = '粉丝'
             this.getfollMess()
        }else if(this.$route.params.id == 1){
            this.follFlag = '关注'
            this.getGzMess()
        }
        
    },
    data(){
        return {
            userInfo:[],
            follFlag:'粉丝',
            followeds:[]
        }
    },
    methods:{
        //查粉丝列表
        async getfollMess(){
             var res = await this.$request('/user/followeds',{
                uid:this.userInfo.userId,
                cookie:encodeURIComponent(JSON.parse(window.sessionStorage.getItem('cookie'))) //报301的添加cookie
            })
            console.log(res)
            this.followeds = res.data.followeds
        },
         //查关注列表
        async getGzMess(){
             var res = await this.$request('/user/follows',{
                uid:this.userInfo.userId,
                cookie:encodeURIComponent(JSON.parse(window.sessionStorage.getItem('cookie'))) //报301的添加cookie
            })
            console.log(res)
            this.followeds = res.data.follow
        },
       
    }
}
</script>

<style scoped>
.wrapper{
    height: calc(100vh - 44px);
    overflow: hidden;
}
    .followed{
        padding-top: 44px;
    }
    ul{
        margin-top: 20px;
        /* padding-bottom: 20px; */
    }
    .li{
        display: flex;
        height: 50px;
        align-items: center;
        width: 100%;
        padding:0 10px;
        box-sizing: border-box;
        font-size: 14px;
        margin-bottom: 10px;
    }
    .li img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        flex: 1;
        /* margin-right: 10px;
        margin-bottom: 10px; */
        margin: auto 10px;
    }
    .li p{
        border-bottom: 1px solid #e3e3e3;
        flex: 8;
        /* background-color: red; */
        height: 50px;
        line-height: 50px;
    }
</style>