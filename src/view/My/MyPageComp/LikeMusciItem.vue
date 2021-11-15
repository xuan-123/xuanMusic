<template>
  <div>
    <!-- {{ songs.al.name }} -->
    <ul>
        <li class="li" @click="goLisenMusic">
            <p class="lip">{{idx +1}}</p>
            <div class="liDiv">
                <p>{{songs.name}}</p>
                <span v-if="songs.ar[0]">{{songs.ar[0].name}}</span>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
    },
    idx:{
        type:Number
    }
  },
  data(){
      return {
          songs:[]
      }
  },
  mounted() {
    this.getMusicDetail();
  },
  methods: {
    async getMusicDetail() {
      let res = await this.$request("/song/detail", {
        ids: this.id,
        // cookie: encodeURIComponent(
        //   JSON.parse(window.sessionStorage.getItem("cookie"))
        // ), //报301的添加cookie
      });
      this.songs = res.data.songs[0]
    },
    goLisenMusic(){
        // window.sessionStorage.setItem('linsinMusic',JSON.stringify(this.songs))
        this.$store.commit('addMusic',JSON.stringify(this.songs))

         this.$router.push('/lisinemusic/'+ this.id)
    }
  },
};
</script>

<style>
.li{
    display: flex;
    /* margin-bottom: 10px; */
    height: 60px;
    align-items: center;
}
.li .lip{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items:center
}

.liDiv{
    flex: 9;
}
.liDiv p{
    font-size: 14px;
}
.liDiv span{
    font-size: 12px;
}
</style>