<template>
    <div class="navbar">
        <div slot="left">返回</div>
            <div slot="center">首页</div>
            <div slot="right">菜单</div>
    </div>
            
</template>

<script>
export default {

}
</script>

<style scope>
    .navbar{
        display: flex;
        width: 100%;
        height: 44px;
        line-height: 44px;
        background-color: #ccc;
        font-size: 14px;
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