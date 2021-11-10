<template>
    <div class="maintabbar">
        <tab-bar>
            <router-link to="/home" active-class="activeClass" >
                <tab-bar-item >
                    <div slot="top">发现</div>
                   <div slot="bottom">-</div>
                   <!-- <div slot="bottom">发现</div> -->
                </tab-bar-item>
            </router-link>
            <!-- <router-link to="/boke" active-class="activeClass" >
                <tab-bar-item  >
                    <div slot="top">播客</div>
                    <div slot="bottom">播客</div>
                </tab-bar-item>
            </router-link> -->
            <router-link to="/my" active-class="activeClass" >
                <tab-bar-item>
                    <div slot="top">我的</div>
                    <div slot="bottom">-</div>
                    <!-- <div slot="bottom">我的</div> -->
                </tab-bar-item>
            </router-link>
            <!-- <router-link to="/kmusic" active-class="activeClass" >
                <tab-bar-item>
                    <div slot="top">关注</div>
                    <div slot="bottom">关注</div>
                </tab-bar-item>
            </router-link> -->
            <router-link to="/yuncun" active-class="activeClass" >
                <tab-bar-item>
                    <div slot="top">MV</div>
                    <div slot="bottom">-</div>
                    <!-- <div slot="bottom">云村</div> -->
                </tab-bar-item>
            </router-link>
            
        </tab-bar>
    </div>
</template>

<script>
import TabBar  from './Tabbar/TabBar.vue'
import TabBarItem from './Tabbar/TabbarItem.vue'
export default {
    components:{
        TabBar,TabBarItem
    },
    
}
</script>

<style>
    .maintabbar{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100vw;
        z-index: 999;
        height: 3.0625rem;
        background-color: #ffffff;
    }
    
</style>