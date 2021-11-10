<template>
    <div class="level">
        <nav-bar>
            <div slot="left"><p class="iconfont icon-fanhui" @click="$router.go(-1)"></p></div>
            <div slot="center">我的等级</div>
            <div slot="right"></div>
        </nav-bar>
        <div class="imgavl">
            <img :src="userInfo.avatarUrl"  alt="">
            <p>当前等级：<span style="color:red">Lv{{level.level}}</span> </p>
        </div>
        <div class="power">
            <p >当前等级特权</p>
            <p class="powerP" v-for="item in info" :key="item">
                -{{item}}
            </p>
          
        </div>
        <div class="fenge"></div>
        <div class="nextLevel">
            <p>距离下一个等级：<span style="color:red">{{level.level + 1}}</span></p>
            <div class="progress">
                <div>
                    <van-circle v-model="level.nextPlayCount" :rate="needPlay" color="red" :speed="100" size="120px"  :text="text" />
                    <p style="margin-top:10px">听歌量</p>
                </div>
                <div>
                    <van-circle v-model="level.nextLoginCount" :rate="needDay"  :speed="100" size="120px"  :text="text2" />
                    <p style="margin-top:10px">登录天数</p>
                </div>
            </div>
        </div>
        <div class="fenge2">
            听歌量是指计播放的歌曲数量曲数量而非播放次数，并且实际播放时间过短的歌曲将不纳入计算，每天最多计算300首。
        </div>
    </div>
</template>

<script>
import  Circle  from 'vant';
import NavBar from '../../../components/NavBar/NavBar.vue'

export default {
    components:{
       NavBar,Circle,
    },

    data(){
        return{
            userInfo:{},
            level:{},
            currentRate: 5000,
            currentRate2: 0,
            needPlay:0,
            needDay:0
        }
    },
    created(){
            this.level = JSON.parse(window.localStorage.getItem('userlevel'))
    },
    mounted(){
        this.userInfo = JSON.parse(this.$store.state.userInfo)
        this.needPlay = this.level.nextPlayCount - this.level.nowPlayCount
        this.needDay = this.level.nextLoginCount - this.level.nowLoginCount
        console.log(typeof this.needDay)
        this.info = this.level.info.split('$')
        console.log(this.info)
    },
    computed: {
        text() {
        // return this.currentRate.toFixed(0) + '%'; 
        return '还需'+ this.needPlay + '首'
        },
        text2() {
        return '还需'+ this.needDay + '天'
        },
  },
}
</script>

<style scoped>
    .level{
        padding-top: 44px;
    }
    .imgavl img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    .imgavl{
        /* background-color: #ccc; */
        padding: 20px 0;
        text-align: center;
        border-bottom: 1px solid #e3e3e3;
    }
    .power{
        padding: 20px 20px;

    }
    .power .powerP{
        color: #666;
        font-size: 12px;
    }
    .fenge{
        width: 100%;
        height: 10px;
        background-color: #ececec;
    }
    .fenge2{
        width: 100%;
        font-size: 12px;
        padding: 5px ;
        box-sizing: border-box;
        color: #969696;
        background-color: #ececec;
    }
    .nextLevel{
        font-size: 12px;
        padding: 20px 10px;
    }
    .progress{
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
    }
    .progress p{
        margin-bottom: 10px;

    }
    .progress div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* background-color: #ccc; */
        width: 150px;
        height: 150px;
    }
    
</style>