<template>
  <div style="padding-top:44px">
      <nav-bar>
            <div slot="left"><p class="iconfont icon-fanhui" @click="$router.go(-1)"></p></div>
            <div slot="center">编辑我的歌单</div>
            <div slot="right"><p class="iconfont icon-saomiao"></p></div>
        </nav-bar>
        <div class="cate" style="margin-top:20px">
            <div class="myEdit">
                <p >我的歌单广场</p>
                <p class="edit" @click="edit">{{editFlags}}</p>
            </div>
            <ul>
                <li v-for="item in myTags" :key="item.index" @click="myTagsClick(item)"> 
                    <p v-show="editFlag">-</p>
                    <p>{{item.name}}</p>
                </li>
            </ul>
        </div>
        <div class="cate">
            <p style="margin-left:10px">语种</p>
            <ul>
                <li v-for="item in tags0" :class="item.checkFlag?'bg':''" :key="item.index" @click="clickTags(item)">
                    <p v-show="editFlag">+</p>
                    <p>{{item.name}}</p>
                </li>
            </ul>
        </div>
        <div class="cate">
            <p style="margin-left:10px">风格</p>
            <ul>
                <li v-for="item in tags1" :class="item.checkFlag?'bg':''" :key="item.index" @click="clickTags(item)">
                    <p v-show="editFlag">+</p>
                    <p>{{item.name}}</p>
                </li>
            </ul>
        </div>
        <div class="cate">
            <p style="margin-left:10px">场景</p>
            <ul>
                <li v-for="item in tags2" :class="item.checkFlag?'bg':''" :key="item.index" @click="clickTags(item)">
                    <p v-show="editFlag">+</p>
                    <p>{{item.name}}</p>
                </li>
            </ul>
        </div>
        <div class="cate">
            <p style="margin-left:10px">情感</p>
            <ul>
                <li v-for="item in tags3" :class="item.checkFlag?'bg':''" :key="item.index" @click="clickTags(item)">
                    <p v-show="editFlag">+</p>
                    <p>{{item.name}}</p>
                </li>
            </ul>
        </div>
  </div>
</template>

<script>
import NavBar from '../../../../components/NavBar/NavBar.vue'
import { Toast } from 'vant';
export default {
    components:{
        NavBar,
        [Toast.name]: Toast
    },
    data(){
        return{
            myTags:[],
            tags0:[],//语种
            tags1:[], //风格
            tags2:[], //场景
            tags3:[], //情感
            allTags:[],
            editFlag:false,
            editFont:'编辑'
        }
    },
    mounted(){
        //从仓库中拿到默认的数据
        this.myTags = this.$store.state.defaultGroup
         this.$request("/playlist/highquality/tags", {}).then((res) => {
            console.log(res.data.tags);
            // this.tags1 = res.data.tags
            this.allTags = res.data.tags
            for(var i=0;i<res.data.tags.length;i++){
              
                if(res.data.tags[i].category == '0'){
                    this.tags0.push(res.data.tags[i])
                }else if(res.data.tags[i].category == '1'){
                    this.tags1.push(res.data.tags[i])
                }else if(res.data.tags[i].category == '2'){
                    this.tags2.push(res.data.tags[i])
                }else if(res.data.tags[i].category == '3'){
                    this.tags3.push(res.data.tags[i])
                }
            }
            console.log(this.tags1)
        });
    },
    methods:{
        edit(){
            this.editFlag = !this.editFlag
            this.checkReflus()
            for(var j = 0;j<this.myTags.length;j++){
                    this.myTags[j].index =j
            }
            if(this.editFlag){
                this.$store.commit('addGroup',this.myTags)
            }
            console.log(this.allTags)
        },
        checkReflus(){//刷新是否展示背景公共方法
              for(var i=0;i<this.allTags.length;i++){
                for(var j = 0;j<this.myTags.length;j++){
                  

                    if(this.allTags[i].name == this.myTags[j].name){
                        this.allTags[i].checkFlag = true
                        break
                    }else {
                        this.allTags[i].checkFlag = false

                    }
                }
            }
        },
        //点击不同非自己的标签
        clickTags(item){ 
            if(!this.editFlag){
                return false
            }
            console.log(item)
            let isFlag = this.myTags.some(items=>{
                return items.name == item.name
            })
            if(isFlag){
                Toast.fail('您已添加过');
                return
            }else{
                this.myTags.push(item)
            }
            this.checkReflus() 
            console.log(this.myTags)
        },
        //我的标签点击
        myTagsClick(item){
             if(!this.editFlag){
                return false
            }
            console.log(item)
            for(var i = 0;i<this.myTags.length;i++){
                if(this.myTags[i].name == item.name){
                    this.myTags.splice(i,1)
                    break
                }
            }
            for(var i=0;i<this.allTags.length;i++){
                if(this.allTags[i].name == item.name){
                    this.allTags[i].checkFlag = false
                }
            }

        }
    },
    computed:{
       editFlags:function(){
           return this.editFlag?'完成':'编辑'
       }
    }
}
</script>

<style scopde>
    .cate{
        /* background-color: #ccc; */
        font-size: 12px;
        margin-bottom: 20px;
    }
    .cate ul{
        display: flex;
        /* background-color: red; */
        flex-wrap: wrap;
    }
    .cate li{
        font-size: 12px;
        width: 50px;
        height: 30px;
        padding: 0 15px;
        background-color: rgb(228, 228, 228);
        border-radius: 15px;
        display: flex;
        align-items:center;
        justify-content: space-around;
        margin: 10px 5px;
    }
    .myEdit{
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        align-items: center;
    }
    .edit{
        color: red;
        width: 50px;
        height: 25px;
        border: 1px solid red;
        text-align: center;
        line-height: 25px;
        border-radius: 15px;
    }
    .cate .bg{
        background-color: #ffffff;
        color: #d6d6d6;
    }
</style>