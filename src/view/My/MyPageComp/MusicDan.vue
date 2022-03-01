<template>
  <div class="musicdan">
            <div class="likemusic">
            <div class="smTitle">
              <p>创建歌单{{this.musicDanList1.length}}</p>
              <p style="font-size:20px" @click="addMusicList">+</p>
            </div>
            <div class="likemusicItem" :class="index>0?'':'mb'" v-for="(item,index) in musicDanList1" :key="item.updateTime" @click="goDanPage(item)">
            <img :src="item.coverImgUrl" alt="" />
            <div>
                <p>{{item.name}}</p>
                <p class="listLen">{{ item.trackCount }}首</p>
            </div>
            </div>
      
        </div>
        <div>
            <div class="likemusic">
            <p class="smTitle">收藏歌单{{this.musicDanList2.length}}</p>

            <div class="likemusicItem" :class="index>2?'':'mb'" v-for="(item,index) in musicDanList2" :key="item.updateTime"  @click="goDanPage(item)">
            <img :src="item.coverImgUrl" alt="" />
            <div>
                <p>{{item.name}}</p>
                <p class="listLen">{{ item.trackCount }}首，by {{item.creator.nickname}}</p>
            </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  // /likelist?uid=32953014
  mounted() {
    this.userInfo = JSON.parse(this.$store.state.userInfo);
    this.getLikeLise()
  },
  data() {
    return {
      musicDanList: [],
      musicDanList1: [],
      musicDanList2: [],
    };
  },
  methods: {
      async getLikeLise() {
        let res = await this.$request("/user/playlist", {
            uid: this.userInfo.userId,
            cookie: encodeURIComponent(
            JSON.parse(window.sessionStorage.getItem("cookie"))
            ), //报301的添加cookie
        });
      console.log(res.data.playlist)
        for(var i=0;i<res.data.playlist.length;i++){
            if(res.data.playlist[i].specialType == 0){
                this.musicDanList.push(res.data.playlist[i])
            }
        }
       for(var i = 0;i<this.musicDanList.length;i++){
           if(i<2){
               this.musicDanList1.push(this.musicDanList[i])
           }else{
               this.musicDanList2.push(this.musicDanList[i])
           }
       }
    },
    goDanPage(item){
      console.log(item)
      
      this.$store.commit('getMusicDanMessage',item)
      // return
        this.$router.push('/musicdanpage/'+ item.id)
    },
    //添加歌单
    addMusicList(){
      
    }
  },
};
</script>

<style scoped>
.smTitle{
    margin-bottom: 10px;
    font-size: 12px;
    color: #a5a5a5;
    display: flex;
    justify-content: space-between;
}
.likemusic {
  /* height: 80px; */
  background-color: #fff;
  width: 100%;
  border-radius: 10px;
  padding: 10px  10px 10px 10px;
  box-sizing: border-box;

  align-items: center;
  font-size: 14px;
  margin-bottom: 10px;
}
.likemusicItem{
    height: 50px;
    display: flex;
}
.mb{
    margin-bottom: 10px;
}
.likemusic img {
  width: 60px;
  height: 100%;
  margin-right: 10px;
}
.listLen {
  font-size: 12px;
  color: #ccc;
  margin-top: 10px;
}
.musicdan{
    margin-top: 10px;
}
</style>