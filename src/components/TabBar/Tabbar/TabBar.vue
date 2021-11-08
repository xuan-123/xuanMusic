<template>
    <div class="tabbar">
        <slot></slot>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    .tabbar{
        display: flex;
    }
    .tabbar a{
        flex: 1;
        color: #000;
    }
    .activeClass{
        color: red!important;;
    }
</style>