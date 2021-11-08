<template>
    <div>
        <Bscroll
            :scrollX = true
            :probeType = 3
            class="wrapper">
            <div class="paiBanner content">
                    <div class="bannerItem" v-for="item in paibanner" :key="item.name">
                        <div class="itemTop"><span class="iconfont" :class="item.icon"></span></div>
                        <div class="itemBot">{{item.name}}</div>
                    </div>
            </div>
        </Bscroll>
        
    </div>
</template>

<script>
//父组件 Home
import Bscroll from '../../../components/Bscroll/Bscroll.vue'
export default {
    name:'PaiBanner',
    components:{
        Bscroll
    },
    props:['paibanner']
}
</script>

<style scoped>
.wrapper{
       height: 4.0625rem;
       width: 100%; 
        /* background-color: red; */
       position :relative;
       margin-top: 10px;
        white-space: nowrap;
        /* border-radius :5px; */
        overflow :hidden;
}
.paiBanner{
    display :inline-block
    }
    .paiBanner .bannerItem{
        width: 2.5rem;
        height: 3.5rem;
        margin-left: 1.65rem;
        font-size: .75rem;
        display: inline-block;   
    }
    .bannerItem .itemTop{
        width: 2.5rem;
        height: 2.5rem;
        background-color: rgb(248, 211, 240);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.25rem;
        margin-bottom: .3125rem;
        color: rgb(248, 43, 94);
    }

</style>