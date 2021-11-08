<template>
    <div>
        <div class="navbar">
            <div class="left"><slot name="left"></slot></div>
            <div class="center"><slot name="center"></slot></div>
            <div class="right"><slot name="right"></slot></div>
        </div>
        <!-- <van-popup position="left">内容</van-popup> -->
    </div>
</template>

<script>
// import NavBarList from './NavBarList/NavBarList.vue'
export default {
    components:{
        // NavBarList
    }
}
</script>

<style scope>

.navbar{
        display: flex;
        width: 100%;
        height: 2.75rem;
        line-height: 2.75rem;
        background-color: #fff;
        font-size: 14px;
        position: fixed;
        z-index: 99;
        top: 0;
        left: 0;
        border-bottom: 1px solid #f3f3f3;
    }
      .ipt{
        width:100%;
        height: 1.7rem;
        border: 1px solid #fff;
        border-radius: 1.25rem;
        padding: 0 .625rem;
        box-sizing: border-box;
        background-color: #f3f3f3;
        outline: none;
        border: none;
        font-size: .875rem;
    }
    .navbar div{
        text-align: center;
    }
    .navbar .left{
        flex: 1;
    }
     .navbar .center{
        flex: 6;
    }
  
     .navbar .right{
        flex: 1;
    }
</style>