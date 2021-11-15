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
                <li v-for="item in myTags" :key="item.index">
                    <p v-show="editFlag">-</p>
                    <p>{{item.name}}</p>
                </li>
            </ul>
        </div>
        <div class="cate">
            <p style="margin-left:10px">语种</p>
            <ul>
                <li v-for="item in tags0" :key="item.index">
                    <p v-show="editFlag">+</p>
                    <p>{{item.name}}</p>
                </li>
            </ul>
        </div>
        <div class="cate">
            <p style="margin-left:10px">风格</p>
            <ul>
                <li v-for="item in tags1" :key="item.index">
                    <p v-show="editFlag">+</p>
                    <p>{{item.name}}</p>
                </li>
            </ul>
        </div>
        <div class="cate">
            <p style="margin-left:10px">场景</p>
            <ul>
                <li v-for="item in tags2" :key="item.index">
                    <p v-show="editFlag">+</p>
                    <p>{{item.name}}</p>
                </li>
            </ul>
        </div>
        <div class="cate">
            <p style="margin-left:10px">情感</p>
            <ul>
                <li v-for="item in tags3" :key="item.index">
                    <p v-show="editFlag">+</p>
                    <p>{{item.name}}</p>
                </li>
            </ul>
        </div>
  </div>
</template>

<script>
import NavBar from '../../../../components/NavBar/NavBar.vue'

export default {
    components:{
        NavBar
    },
    data(){
        return{
            myTags:[],
            tags0:[],//语种
            tags1:[], //风格
            tags2:[], //场景
            tags3:[], //情感
            editFlag:false,
            editFont:'编辑'
        }
    },
    mounted(){
        this.myTags = this.$store.state.defaultGroup
         this.$request("/playlist/highquality/tags", {}).then((res) => {
            console.log(res.data.tags);
            // this.tags1 = res.data.tags

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
        background-color: rgb(241, 241, 241);
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
</style>