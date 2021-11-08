<template>
    <div class="usermain">
        <nav-bar>
            <div slot="left"><p class="iconfont icon-fanhui" @click="$router.go(-1)"></p></div>
            <div slot="center">{{userInfo.nickname}}</div>
            <div slot="right"></div>
        </nav-bar>
        <div class="userInfo">
            <div class="img">
                <img :src="userInfo.avatarUrl" alt="">
            </div>
            <div class="edit">
                <div class="top">
                    <div @click="gotoFollowed">
                        <p>{{userInfo.followeds}}</p>
                        <p>粉丝</p>
                    </div>
                    <div>
                        <p>{{userInfo.follows}}</p>
                        <p>关注</p>
                    </div>
                    <div @click="goLevel">
                        <p>{{userLevel.level}}</p>
                        <p>等级</p>
                    </div>
                </div>
                <div class="bottom" @click="goEditMasseg">编辑信息</div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '../../../components/NavBar/NavBar.vue'
export default {
    components:{
        NavBar
    },
    data(){
        return {
            userInfo:{},
            userLevel:{}
        }
    },
    mounted(){
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        console.log(JSON.parse(sessionStorage.getItem('userInfo')))
        console.log(this.$route.params.id)
        this.getDatas()
    },
    methods:{

        async getDatas(){
            
            // console.log(JSON.parse(sessionStorage.getItem('cookie')))
            var res = await this.$request('/user/level',{
                // uid:this.$route.params.id,
                cookie:encodeURIComponent(JSON.parse(window.sessionStorage.getItem('cookie'))) //报301的添加cookie
            })
            console.log(res)
            this.userLevel = res.data.data
            
            // this.banners = res.data.b/anners
            // this.storageLocal.set('banners',this.banners)  
        },
        //去粉丝页
        gotoFollowed(){
            this.$router.push('/followedpage')
        },
        goLevel(){
            window.localStorage.setItem('userlevel',JSON.stringify(this.userLevel))
            // emitter.emit('userlevel',this.userLevel)
            this.$router.push('/userlevel')

        },
        goEditMasseg(){
            this.$router.push('/usereditmasseg')
        }
    }
}
</script>

<style scoped>

    .usermain{
        padding-top: 44px;
    }
    .userInfo{
        padding: 0 20px;
        box-sizing: border-box;
        height: 100px;
        width: 100%;
        display: flex;
        /* background-color: #ccc; */
        align-items: center;
    }
    .userInfo img{
        width: 80px;
        height: 80px;
    }
    .img{
        flex: 2;
    }
    .edit{
        font-size: 14px;
        flex:6;
        height: 100%;
        /* background-color: red; */
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .edit .top{
        display: flex;
        justify-content: space-around;
    }
    .edit .top div{
        text-align: center;
    }
    .edit .bottom{
        height: 24px;
        line-height: 24px;
        margin: 0 auto;
        width: 90%;
        border-radius: 10px;
        border: 1px solid #e3e3e3;
        text-align: center;
        
    }
</style>