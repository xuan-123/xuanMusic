<template>
    <div class="comment">
        <!-- 导航栏 -->
        <div class="title">
            <div class="left"><p class="iconfont icon-fanhui" @click="goBack"></p></div>
            <div class="center">
                评论({{totalComments}})
            </div>
            <div class="right"></div>
        </div>
        <div class="commentTitle">
            <p>评论区</p>
            <div class="cateComment">
                <p :class="[cateFlag1 ? 'cateName' :'']" @click="checkCateFlag('1')">最新</p>
                <p :class="[cateFlag2 ? 'cateName' :'']" @click="checkCateFlag('2')">最热</p>
            </div>
        </div>
        <Bscroll 
                ref='wrapper'
                :probeType = 3
                :data="comments" 
                :click = true
                :pullup = true
                :listenScroll = true
                @scrollToEnd="pullup"
                @scroll = scroll
                :scrollYpos = scrollYpos
                :cateFlag = cateFlag
                class="wrapper">
                <div class="content">
                        <div class="commentContent " v-if="cateFlag1">
                <div class="commentMain" v-for="item in comments" :key="item.commentId">
                    <div class="left">
                        <img :src="item.user.avatarUrl" alt="">
                    </div>
                    <div class="right">
                        <div class="rightTop">
                            <div class="nickName">{{item.user.nickname}}</div>
                            <div class="good" style="color:#555">{{item.likedCount}}赞</div>
                        </div>
                        <p class="rightcontent">{{item.content}}</p>
                    </div>
                </div>
                <div class="more" v-show="cateFlag1">上滑加载更多</div>

                        </div>
                        <div class="commentContent content2 " v-if="cateFlag2">
                        <div class="commentMain" v-for="item in hotComments" :key="item.commentId">
                            <div class="left">
                                <img :src="item.user.avatarUrl" alt="">
                            </div>
                            <div class="right">
                                <div class="rightTop">
                                    <div class="nickName">{{item.user.nickname}}</div>
                                    <div class="good" style="color:#555">{{item.likedCount}}赞</div>
                                </div>
                                <p class="rightcontent">{{item.content}}</p>
                            </div>
                        </div>
                        </div>
                </div>
        </Bscroll>
    </div>
</template>

<script>
import Bscroll from '../Bscroll/Bscroll.vue'
export default {
    components:{
        Bscroll
    },
    mounted(){

        // if(window.sessionStorage.getItem('addcommentFlag') == '2'){
        if(this.$store.state.commentFlag == '2'){
            this.commentUrl = '/comment/playlist'
        }else{
            this.commentUrl = '/comment/music'

        }
        this.getUserComment()
        
    },
    data(){
        return {
            comments:[],
            hotComments:[],
            offset:10,
            totalComments:0,
            cateFlag:'1',
            cateFlag1:true,
            cateFlag2:false,
            scrollY:0,
            scrollYpos:0,
            commentUrl:'1'

        }
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        scroll(pos){
            // console.log(pos.y)
            this.scrollY = pos.y
        },
        //获取评论

        async getUserComment(){
            let res = await this.$request(this.commentUrl ,{
                id:this.$route.params.id,
                limit:10
            })
            console.log(res.data.total)
            this.totalComments = res.data.total
            this.comments = res.data.comments
            this.hotComments = res.data.hotComments
            console.log(res.data.hotComments)
        },
        //分页
        pullup(){
            //触底之后会触发此事件
            if(this.cateFlag2){
                return
            }
            this.offset = this.offset+10
            this.$request(this.commentUrl ,{
                id:this.$route.params.id,
                limit:10,
                offset:this.offset
            }).then(res=>{
                this.comments = this.comments.concat(res.data.comments)
                console.log(res.data.comments)
            })
           
        },
        checkCateFlag(flag){
            this.cateFlag = flag
            if(flag=='1'){
                this.cateFlag1 = true,
                this.cateFlag2 = false
                this.scrollYpos = this.scrollY
                console.log(this.scrollYpos + 'dddddddddd')
            }else{
                // this.scrollYpos = 0
                this.cateFlag1 = false,
                this.cateFlag2 = true
            }
        }
    }
}
</script>

<style scoped>
.comment{
    padding-top: 50px;
}
 .title{
        display: flex;

        height: 50px;
        line-height: 50px;
        /* background-color: #ccc; */
        /* background-color: rgba(0, 0, 0, 0); */
        position: absolute;
        top: 0;
        z-index: 4;
        width: 100%;
    }
    .left{
        flex: 1;
        text-align: center;
        
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
    .commentTitle{
        margin-bottom: 10px;
        font-size: 14px;
        padding: 0 10px;
        box-sizing: border-box;
        height: 30px;
        /* background-color: #ccc;; */
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .commentTitle div{
        display: flex;
        align-items: center;

    }
    .commentContent{
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;

    }
    .commentMain{
        width: 100%;
        display: flex;
        margin-bottom: 5px;
    }
    .commentMain .left{
        flex: 2;
        /* background-color: skyblue; */
        border-radius: 30px;
        
    }
    .commentMain .left img{
        width: 40px;
        height: 40px;
        border-radius: 30px;

    }
    .commentMain .right{

        border-bottom: 1px solid rgb(240, 240, 240);
        font-size: 14px;
        flex: 11;
        /* background-color: red; */
    }
    .rightTop{
        height: 40px;
        /* background-color: yellow; */
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .nickName{

    }
    .good{

    }
    .rightcontent{
        padding: 15px 10px;
        /* background-color: paleturquoise; */
    }
    .cateComment{
        display: flex;
        width: 80px;
        justify-content: space-around;
        color: rgb(95, 95, 95);
    }
    .cateName{
        color: #000;
    }
    .wrapper{
       height: calc(100vh - 60px);
       overflow: hidden;
   }
   .content{
       padding-bottom: 60px;
   }
   .more{
       /* background-color: #ccc; */
       width: 100%;
       text-align: center;
       color: #999;
   }

</style>