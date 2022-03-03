<template>
    <div>播客
        <!-- 底部导航 -->
        <main-tab-bar></main-tab-bar>
    </div>
</template>

<script>
import MainTabBar from '../../components/TabBar/MainTabBar.vue'

export default {
    components:{
        MainTabBar
    },
    created(){
        console.log('1')
    },
    mounted(){
        console.log('2')
        console.log('小凡凡工')
    },
    
}
</script>

<style>

</style>