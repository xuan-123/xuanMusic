<template>
  <div>
    <Bscroll :scrollX="true" :probeType="3" class="wrapper">
      <div class="paiBanner content">
        <div
          class="bannerItem"
          v-for="item in paibanner"
          :key="item.name"
          @click="getFm(item)"
        >
          <div class="itemTop">
            <span class="iconfont" :class="item.icon"></span>
          </div>
          <div class="itemBot">{{ item.name }}</div>
        </div>
      </div>
    </Bscroll>
  </div>
</template>

<script>
//父组件 Home
import Bscroll from "../../../components/Bscroll/Bscroll.vue";
export default {
  name: "PaiBanner",
  components: {
    Bscroll,
  },
  props: ["paibanner"],
  data() {
    return {
      dailySongs: [],
        danList:[
                { name:'官方',index:0 },
                { name:'精品',index:1 },
                { name:'华语',index:2 },
                { name:'流行',index:3 },
                { name:'摇滚',index:4 },
                { name:'民谣',index:5 },
                { name:'电子',index:6 },
                { name:'轻音乐',index:7 },
                { name:'古典',index:8 },
                { name:'古典2',index:9 },
            ],
    };
  },
  methods: {
    getFm(item) {
      if (item.name == "每日推荐") {
        this.$router.push("/daymusic");
      } else if(item.name == "歌单"){
        this.$store.commit('addGroup',this.danList)
        this.$router.push('/musicgroup')
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  height: 4.0625rem;
  width: 100%;
  /* background-color: red; */
  position: relative;
  margin-top: 10px;
  white-space: nowrap;
  /* border-radius :5px; */
  overflow: hidden;
}
.paiBanner {
  display: inline-block;
}
.paiBanner .bannerItem {
  width: 2.5rem;
  height: 3.5rem;
  margin-left: 1.65rem;
  font-size: 0.75rem;
  display: inline-block;
}
.bannerItem .itemTop {
  width: 2.5rem;
  height: 2.5rem;
  background-color: rgb(248, 211, 240);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  margin-bottom: 0.3125rem;
  color: rgb(248, 43, 94);
}
</style>