<template>
  <div style="padding-top: 44px">
    <nav-bar>
      <div slot="left">
        <p class="iconfont icon-fanhui" @click="$router.go('-1')"></p>
      </div>
      <div slot="center">编辑歌单信息</div>
      <div slot="right"></div>
    </nav-bar>
    <ul>
      <li style="padding: 5px 10px">
        <p>更换封面</p>
        <input
          id="file"
          style="display:none"
          type="file"
          name="filename"
       
          @change="fileChange"
        />
        <label for="file">
          <img
          width="60px"
          height="100%"
          :src="coverImgUrl"
          alt=""
        />
      </label>
        
      </li>
      <li>
        <p>名称</p>
        <p>{{ musicDanMessage.name }}</p>
      </li>
      <li>
        <p>标签</p>
        <p>{{ musicDanMessage.tags[0] }}</p>
      </li>
      <li>
        <p>描述</p>
        <p>{{ musicDanMessage.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import NavBar from "../../../components/NavBar/NavBar.vue";
import axios from "axios";
import { Loading } from 'element-ui'
export default {
  components: {
    NavBar,
  },

  mounted() {

    this.musicDanMessage = this.$store.state.musicDanMessage;
    console.log(this.musicDanMessage);
    this.coverImgUrl = this.musicDanMessage.coverImgUrl
  },
  data() {
    return {
      musicDanMessage: {},
      coverImgUrl:""
    };
  },
  methods: {
    fileChange(e) {
      var file = e.target.files[0];
      console.log(file);
      this.upload(file);
    },
     upload(file) {
 Loading.service({});//请求接口loading

      var formData = new FormData();
      formData.append("imgFile", file, file.name);
      let cookie = encodeURIComponent(
        JSON.parse(window.sessionStorage.getItem("cookie"))
      );
      let timestamp = Date.now()
      let id = this.$route.params.id;
     axios({
        method: "post",
        url: `http://localhost:3000/playlist/cover/update?id=${id}&cookie=${cookie}&timestamp=${timestamp}`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
    
    }).then(res=>{
      console.log(res)
        if(res.data.code == 200){
           Loading.service().close()//关闭请求接口loading
          this.coverImgUrl = res.data.data.url

        }
    })
   
    }}
}
</script>

<style scoped>
ul {
  padding: 0 10px;
}
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  height: 60px;
  font-size: 14px;
}
</style>