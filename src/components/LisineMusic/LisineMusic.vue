<template>
    <div class="lisineMusic" :style="{backgroundImage: 'url(' + (picUrl) + ')', backgroundSize:'100% 100%', backgroundRepeat: 'no-repeat'}">
        <!-- 导航栏 -->
        <div class="title">
            <div class="left"><p class="iconfont icon-fanhui" @click="goBack"></p></div>
            <div class="center">
                <p class="p1" style="color:#fff">{{singerName}}</p>
                <p class="p2"> {{songerName}}</p>
            </div>
            <div class="right"></div>
        </div>
        <!-- 中间图片 -->
        <div class="Img" v-show="!showimgOrlyrc" @click="showimgOrlyrc = !showimgOrlyrc">
            <img class="penImg" src="../../assets/11.png" alt="">
            <div class="centerImgDiv" ref="centerImgDiv" :style="{backgroundImage: 'url(' + (picUrl) + ')', backgroundSize:'100% 100%', backgroundRepeat: 'no-repeat'}">
                <img class="centerImg" src="../../assets/123.png" alt="">
            </div>
        </div>
         <div class="lyrc" v-show="showimgOrlyrc" @click="showimgOrlyrc = !showimgOrlyrc">
            <p v-for="(item,index) in lyric" :key="index" 
            style="text-align:center;font-size:12px;margin:15px 0;" :class="currentTime >= item.time && index <= item.index?'lyrcLine':''" 
            >{{item.value}} {{item.time}}</p>
        </div>
        <!-- 背景模糊层 -->
        <div class="lisineMusic2" ></div>
        <!-- 播放控件 -->
        <audio
            :src="musicUrl"
            ref="audioPlayer"
            autoplay
           
        ></audio>
        <van-slider class="slidercloum" v-show="volumeFlag"  :vertical= true v-model="volumeProgress" @change="onChangeVolume" />
        <div class="slidervolume">
            <span style="color:#fff" @click="userLike">评论</span>
            <div>
                <span style="color:#fff" @click="showVolume">音量</span>
            </div>
         </div>
        <!-- 音频控制 -->
        <div class="buttonControl">
            <div  @click="playMusicf" class=" iconfont icon-diyiyeshouyeshangyishou "></div>
            <div  @click="playMusicf" class=" iconfont icon-zanting play"  v-show="isPlay"></div>
            <div  @click="playMusicf" class=" iconfont icon-24gf-play play" v-show="!isPlay"></div>
            <div  @click="playMusicf" class=" iconfont icon-zuihouyiyemoyexiayishou "></div>
        </div>
        <div class="sliderContent">
            <span style="color:#fff">{{currentTime|handleMusicTime}}</span>
            <van-slider class="sliderrow"  v-model="timeProgress" @change="onChange" />
            <span style="color:#fff">{{musicTalTime|handleMusicTime}}</span>
         </div>

    </div>
</template>

<script>
import NavBar from '../NavBar/NavBar.vue'
import { returnSecond  } from '../../../src/assets/lib/js/filter/filter'
import { Slider } from 'vant';
export default {
    components:{
        NavBar,
        [Slider.name]: Slider,
    },
    created(){

    },
    mounted(){
        //获取歌曲url用于播放
       this.getSingerUrl()

        //获取用户要播放的歌曲
       
        setTimeout(() => {
            //  this.getItemLisinMusic()
             this.playMusic()
        }, 100);
        //监听音频当前播放时间

    },
    
    data(){
        return {
            name:'播放',
            singerName:'',
            songerName:'',
            picUrl:'',
            musicUrl:'',
            isPlay:true,
            musicTalTime:0,
            durationNum:0,
            timeProgress:0,
            currentTime:0,
            volumeFlag:true,
            // 音量
            volumeProgress: 35,
            // 是否静音
            isMuted: false,
            lyric:[],
            showimgOrlyrc:false,
            time:null
        }
    },
destroyed(){
        clearInterval(this.time)
    },
    methods:{
        updates(){
            console.log('1')
        },
        goBack(){
            this.$router.go(-1)
        },

        //获取歌手信息
       async getSingerUrl(){
          let res = await this.$request('/song/url',{
               id:this.$route.params.id,
           })
           this.musicUrl = res.data.data[0].url
           console.log(res.data.data[0].url)
           console.log(res)
           this.getItemLisinMusic()
        },
        //一进页面从本地缓存中拿当前播放的数据，以后要改为store方式
        getItemLisinMusic(){
            // console.log(this.$store.state.currentMusic)
            // let linsinMusic = window.sessionStorage.getItem('linsinMusic')
            let linsinMusic = this.$store.state.currentMusic
            linsinMusic = JSON.parse(linsinMusic)
            console.log('_________________________')
            this.singerName = linsinMusic.name
            this.songerName = linsinMusic.ar[0].name || 'xuan'
            this.picUrl = linsinMusic.al.picUrl
            this.musicTalTime = linsinMusic.dt //歌曲总时长
            this.durationNum = returnSecond(this.musicTalTime) //歌曲总秒数
            //拿到音乐总时长后调倒计时
            // var time = null

            this.getlyric(linsinMusic)
            if(this.currentTime != Math.floor(this.durationNum)){
                this.time = setInterval(()=>{
                        this.currentTime = Math.floor(this.$refs.audioPlayer.currentTime)
                        this.timeProgress = Math.floor((this.currentTime / this.durationNum) * 100); //获取当前进度条数据 100份
                console.log(this.currentTime)

                },1000)
            if(this.currentTime == Math.floor(this.durationNum)){ 
                clearInterval(this.time)
                return 
            }
        }
        },
        
        getlyric(cur){
            this.$request('/lyric',{
                id:cur.id,
            }).then(res=>{
                // console.log(res.data.lrc.lyric)
                console.log(res)
                let a = []
                this.lyric = res.data.lrc.lyric.split('\n')
                
                for(var i = 0;i<this.lyric.length-1;i++){
                    // Number(this.lyric[i].split(']')[0].slice(1).split(':')[0] * 60) 
                    // console.log(this.lyric[i].split(']')[0].slice(1).split(':')[1])
                    // console.log(this.lyric[i].split(']')[0].slice(1).split(':')[1].slice(0,2))
                    let time =Number(this.lyric[i].split(']')[0].slice(1).split(':')[0] * 60) + Number(this.lyric[i].split(']')[0].slice(1).split(':')[1].slice(0,2))
                    let lyric = this.lyric[i].split(']')[1]
                    a.push({
                        index:i,
                        time:time,
                        value:lyric
                    },)
                }
                console.log(a)
                this.lyric = a
                // console.log(this.lyric)
                
            })
        },
        //改为slider监听
        onChange(e){
            this.currentTime = Math.floor((e / 100) * this.durationNum);
            // 改变audio的实际当前播放时间
            this.$refs.audioPlayer.currentTime = this.currentTime;
            console.log(this.currentTime)
        },
        //滑块控制音量
        onChangeVolume(e){
            this.$refs.audioPlayer.volume = e / 100;
            console.log(e)
        },
        //点击播放暂停按钮
        playMusicf(){
            this.isPlay = !this.isPlay
            this.isPlay ? this.playMusic() : this.pauseMusic();
        },
        // 播放音乐的函数
        playMusic() {
           
                this.$refs.audioPlayer.play();
          
        },
        // 暂停音乐的函数
        pauseMusic() {
            this.$refs.audioPlayer.pause();
        },
        //控制音频展示
        showVolume(){
            this.volumeFlag = !this.volumeFlag
        },
        //用户评论
        userLike(){
             this.$store.commit('addcommentFlag','1')

            window.sessionStorage.setItem('addcommentFlag','1')

            this.$router.push('/musiccomment/'+this.$route.params.id)
                
        }
        
    },
    computed:{
       
    }
   
   
}
</script>

<style scoped>
    .lisineMusic{
        height: 100vh;
        width:100vw;
     /* animation: round_animate 22s linear infinite;  */
    }
    .lisineMusic2{
         height: 100vh;
        width:100vw;
        filter: blur(15px);
        /*为了模糊更明显，调高模糊度*/
        position: absolute;
        top:0;
        z-index: 0;
        background: inherit;
    
    }
    .title{
        display: flex;
        height: 50px;
        line-height: 50px;
        /* background-color: red; */
        background-color: rgba(0, 0, 0, 0);
        position: absolute;
        z-index: 4;
        width: 100%;
    }
    .left{
        flex: 1;
        text-align: center;
        color: #fff;
    }
    .center{
        flex: 6;
    }
    .center .p1{
        height: 30px;
        font-size: 14px;
        text-align: center;
        line-height: 30px;
    }
    .center .p2{
        height: 20px;
        font-size: 12px;
        text-align: center;
        line-height: 20px;
        color: #fff;
    }
    .right{
        flex: 1;
    }
    .Img{
        background-color: #ccc;
        margin: 0 auto;
        width:250px;
    }
      .penImg{
        width:250px;
        height: 250px;
        position: absolute;
        z-index: 22;
        top: 0;
    }
    .centerImgDiv{
        width:249px;
        height: 249px;
        border-radius: 50%;
        position: absolute;
        z-index: 11;
        top: 150px;
        animation: round_animate 22s linear infinite;
    }
    .centerImg {
        width:250px;
        height: 250px;
        position: absolute;
        z-index: 11;
        /* top: 150px; */
        /* background-color: #ccc; */
        background-image: var(picUrl);
    } 
       
       @keyframes round_animate {
         to {
           transform: rotate(1turn);
         }
       }
    /* .centerImgbg{
        width:250px;
        height: 250px;
        position: absolute;
        z-index: 12;
        top: 150px;
    } */
    .centerImg img{
        width:250px;
        height: 250px;
       
    }
    .buttonControl{
        position: absolute;
        width: 100%;
        height: 60px;
        /* background-color: #ccc; */
        bottom: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99;
        background-color: rgba(0, 0, 0, 0);
    }
    .buttonControl .play{
        color: #fff;
        margin: 0 20px;
        font-size: 40px;
        background-color: rgba(0, 0, 0, 0);
    }
     .buttonControl div{
        color: #fff;
        font-size: 40px;
        background-color: rgba(0, 0, 0, 0);
    }
    .sliderContent{
        position: absolute;
        bottom: 20px;
        height: 30px;
        width: 100%;

       
    }
    .sliderrow{
         margin: 0 auto;
         width: 80%;
         margin: 0 10px;
 
    }
    .sliderContent{
        margin: 0 10%;
        width: 80%;
        height: 40px;
        /* background-color: #ccc; */
        display: flex;
        justify-content: center;
        align-items: center;
    }
    /* .sliderrow{
        margin: 0 10px;
    } */
    .slidervolume{
        margin: 0 10%;
        position: absolute;
        bottom: 100px;
        height: 40px;
        width: 80%;
        /* background-color: #ccc; */
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .slidercloum{
        height: 150px;
        position: absolute;
        bottom: 140px;
        right: 60px;
        z-index: 99;
    }
    .lyrc{
        /* background-color: #ccc; */
        width: 80%;
        height: 400px;
        top: 45%;
        left: 50%;
        margin-top: -200px;
        margin-left: -40%;
        position: absolute;
        z-index: 33;
        overflow: hidden;
        overflow: scroll;
        color: #a7a7a7;
        
    }
    .lyrc .lyrcLine{
        color: #fff;
    }
</style>