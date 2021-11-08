<template>
    <div class="followed">
        <nav-bar>
            <div slot="left"><p class="iconfont icon-fanhui" @click="$router.go(-1)"></p></div>
            <div slot="center">粉丝</div>
            <div slot="right"></div>
        </nav-bar>
        粉丝页
    </div>
</template>

<script>
import NavBar from '../../../components/NavBar/NavBar.vue'

export default {
    components:{
        NavBar
    }
}
</script>

<style>

</style>