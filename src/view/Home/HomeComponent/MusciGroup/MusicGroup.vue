<template>
    <div class="group">
         <nav-bar>
            <div slot="left"><p class="iconfont icon-fanhui" @click="$router.go(-1)"></p></div>
            <div slot="center">歌单广场</div>
            <div slot="right"><p class="iconfont icon-saomiao"></p></div>
        </nav-bar>
        <div class="rowLi">
            <ul>
                <li :class="currentDan==item.index?'red':''" v-for="item in myGroup"  :key="item.index" @click="checkDan(item.index)">{{item.name}}</li>
            </ul>
            <div class="menu" @click="goEditGroup">菜单</div>
        </div>
    </div>
</template>

<script>
import NavBar from '../../../../components/NavBar/NavBar.vue'

export default {
    components:{
        NavBar
    },
    mounted(){
        this.myGroup = this.$store.state.defaultGroup
        // this.$request("/playlist/hot", {}).then((res) => {
        //   console.log(res);
        //   this.$request("/top/playlist", {cat:'华语'}).then((res) => {
        //     console.log(res);
        // });
        //  this.$request("/playlist/highquality/tags", {}).then((res) => {
        //     console.log(res);
            
        // });

           
    // })
    },
    data(){
        return{
            myGroup:[],
            currentDan:0
        }
    },
    methods:{
        checkDan(i){
            this.currentDan = i
            console.log(i)
        },
        goEditGroup(){
            this.$router.push('/editgroup')
        }
    }
}
</script>

<style scoped>
    .group{
        padding-top: 44px;
    }
    .rowLi{
        /* background: #ccc; */
        display: flex;
        height: 30px;
        align-items: center;
    }
    .rowLi ul{
        flex: 9;
        border-right: 1px solid #000;
        margin: 0 5px;
        display: flex;
         overflow-x: auto;
        overflow-y: hidden;
        white-space:nowrap;
        font-size: 12px;


    }
    li{
        display: inline-block;
        margin: 0 5px;
        color: rgb(73, 73, 73);
    }
    .menu{
        flex: 1;
        font-size: 12px;
    }
    .red{
        color: red;
    }
</style>