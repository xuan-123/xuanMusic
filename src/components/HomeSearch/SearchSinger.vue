<template>
    <div class="searchSinger">
        <nav-bar>
            <div slot="left"><p class="iconfont icon-fanhui" @click="goBack"></p></div>
            <div slot="center"><p>歌手分类</p></div>
        </nav-bar>
       
            <div class="singerCheck" >
            <ul>
                <li v-for="(item,index) in singerType" :key="item.id" @click="clickType(index)" :class="[item.fongCol ? 'liCol' :'']">
                    {{item.name}}
                </li>
            </ul>
            <ul>
                <li v-for="(item,index) in singerArea" :key="item.id" @click="clickArea(index)" :class="[item.fongCol ? 'liCol' :'']">
                    {{item.name}}
                </li>
            </ul>
            </div>
            <div class="line"></div>
            <Bscroll 
                ref='wrapper'
                :probeType = 3
                :data="1" 
                :click = true
                class="wrapper">
                <ul class="singList content pad">
                    <li v-for="item in artistsArr" :key="item.id">
                        <div class="name" @click="singerDetail(item)">
                            <img v-lazy="item.img1v1Url" alt="">
                            <p>{{item.name}}</p>
                        </div>
                        <div class="followd" >
                            +关注
                        </div>
                    </li>
                </ul> 
            </Bscroll>
    </div>
    
</template>

<script>
import NavBar from '../NavBar/NavBar.vue'
import Bscroll from '../Bscroll/Bscroll.vue'
export default {
    components:{
        NavBar,Bscroll
    },
    created(){
        
    },

   data(){
       return {
           singtypeItem:'-1',
           singareaItem:'-1',
           singerType:[{name:'全部',value:'-1',fongCol:true},{name:'男歌手',value:'1',fongCol:false},{name:'女歌手',value:'2',fongCol:false},{name:'乐队',value:'3',fongCol:false}],
           singerArea:[{name:'全部',value:'-1',fongCol:true},{name:'华语',value:'7',fongCol:false},{name:'欧美',value:'96',fongCol:false},{name:'日本',value:'8',fongCol:false},{name:'韩国',value:'16',fongCol:false},{name:'其他',value:'0',fongCol:false}],
           artists:[],
           artistsArr:[],
           scroll:null
        //    artists:[
        //        {name:'宣祥',img1v1Url:"http://p1.music.126.net/w_vuv9hBWq2hlJxJcmJrjg==/109951166115915081.jpg"}
        //    ]
       }
   },
   mounted(){
    //    歌手列表
        this.getSingerList()

   },
   methods:{
      
      
       goBack(){
           this.$router.go(-1)
       },
       clickType(index){
           for(var i = 0;i<this.singerType.length;i++){
               if(i == index){
                   this.singerType[i].fongCol = true
                   this.singtypeItem = this.singerType[i].value
                   this.getSingerList()
               }else{
                   this.singerType[i].fongCol = false
               }
           }
       },
       clickArea(index){
        for(var i = 0;i<this.singerArea.length;i++){
                if(i == index){
                   this.singareaItem = this.singerArea[i].value
                   this.singerArea[i].fongCol = true
                   this.getSingerList()
                }else{
                   this.singerArea[i].fongCol = false
                }
            }
        },
          //歌手列表
        async getSingerList(){
           let res = await this.$request('/artist/list/',{
               type:this.singtypeItem,
               area:this.singareaItem,
           })
           console.log(res)
           //只是全部的情况下从本地中拿数据
           if(this.singtypeItem == '-1' && this.singareaItem == '-1'){
               var artists = localStorage.getItem('artists')
                var artistsJson = JSON.parse(artists)
                console.log(artistsJson)
                if(artistsJson){
                    this.artists = artistsJson
                }else{
                        this.artists = res.data.artists
                        localStorage.setItem('artists',JSON.stringify(this.artists))
                }
           }else{//其他选项要重新请求接口
               this.artists = res.data.artists
           }
          this.artistsArr = this.artists
        },
        //歌手信息/artist/detail
        singerDetail(item){
               this.$router.push('/singerdetail/'+ item.id)
            //    this.$router.push('/singerdetail/'+ 2116)
         
        }
   }
}
</script>

<style scoped>
    .searchSinger{
        padding-top: 2.75rem;
        /* height: 100vh; */
    }
    .singerCheck{
        height:4.5rem;
        width: 100%;
        /* background-color: #ccc; */
        font-size: .75rem;
        padding: .9375rem 0 0 .625rem;
        box-sizing: border-box;
    }
    .singerCheck ul{
        display: flex;
        margin-bottom: .625rem;
    }
    .singerCheck ul li{
        margin-right: .3125rem;
        width: 3.75rem;
        height: 1rem;
        line-height: 1rem;
        /* background-color: red; */
        text-align: center;
    }
    .liCol{
        color: red;
    }
    .line{
        height: .9375rem;
        width: 100%;
        background-color: #F2F3F7;
    }
    .singList{
        display: flex;
        flex-direction: column;
        font-size: .75rem;
    }
    .singList li{
        height: 3.125rem;
        width: 100%;
        display: flex;
        /* background-color: skyblue; */
        justify-content: space-between;
        /* border-bottom: 1px solid #F2F3F7; */
        margin:.625rem;
        align-items: center;
    }
    .singList li img{
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        margin-right: .9375rem;
    }
    .singList li .name{
        display: flex;
        height: 3.125rem;
        width: 80%;
        /* background-color: #ccc; */
        align-items: center;

        /* line-height: 3.125rem; */
    }
    .followd{
        border: 1px solid red;
        width: 3.75rem;
        height: 1.25rem;
        line-height: 1.25rem;
        text-align: center;
        border-radius: 1.25rem;
        font-size: .75rem;
        color: red;
        margin-right: .625rem;
    }
   .wrapper{
       height: calc(100vh - 60px);
       overflow: hidden;
   }
   .content{
       padding-bottom: 60px;
   }
   
</style>