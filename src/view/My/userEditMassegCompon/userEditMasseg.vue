<template>
    <div class="editMessage">
        <nav-bar>
            <div slot="left"><p class="iconfont icon-fanhui" @click="$router.go(-1)"></p></div>
            <div slot="center">我的资料</div>
            <div slot="right"></div>
        </nav-bar>
            <ul class="messageTop">
                <li>
                    <div class="titl"> 头像</div>
                    <img :src="userInfo.avatarUrl" alt="">
                    <!-- <input name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update"/> -->
                </li>
                <li>
                    <div class="titl"> 昵称</div>
                    <input type="text" v-model="nickname">
                </li>
                <li>
                    <div class="titl"> 性别</div>
                    <input type="text" v-model="gender">
                </li>
                <li>
                    <div class="titl"> 生日</div>
                    <input type="text" v-model="birthday">
                </li>
                <li @click="showCityList">
                    <div class="titl"> 地区</div>
                    <input type="text" v-model="city" >
                </li>
                <li>
                    <div class="titl"> 简介</div>
                    <input type="text" v-model="signature">
                </li>
            </ul>
            <van-popup v-model="showCity" position="bottom" :style="{ height: '30%' }" >
                <van-area ref="area"  title="标题" :area-list="areaList" />
            </van-popup>
            
    </div>
</template>

<script>
import NavBar from '../../../components/NavBar/NavBar.vue'

export default {
    components:{
        NavBar
    },
    mounted(){
        
    },
    data(){
        return {
            userInfo:{},
            nickname:'',
            gender:'',
            birthday:'',
            city:'',
            signature:'',
            showCity:false,
            areaList :{
                province_list: {
                    110000: '北京市',
                    120000: '天津省',
                    130000: '山西省',
                    140000: '黑龙省',
                    150000: '沈阳省',
                    160000: '吉林省',
                    170000: '西藏省',
                    180000: '青海省',
                    190000: '甘肃省',
                    120000: '陕西省',
                    110000: '河南省',
                    120000: '山东省',
                    110000: '上海市',
                    120000: '深圳市',

                },
                city_list: {
                    110100: '北京市',
                    120100: '天津市',
                    120100: '天津市',
                    120100: '天津市',
                },
                county_list: {
                    110101: '东城区',
                    110102: '西城区',
                    // ....
                },
            }
        }
    },
    methods:{
        update (e) {   // 上传照片
            let self = this
            let file = e.target.files[0]
            /* eslint-disable no-undef */
            let param = new FormData()  // 创建form对象
            param.append('file', file)  // 通过append向form对象添加数据
            param.append('chunk', '0') // 添加form表单中其他数据
            console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
            let config = {
                headers: {'Content-Type': 'multipart/form-data'}
            }
            // 添加请求头
            this.$request('/avatar/upload',param,config).then(res=>{
                 console.log(res)
             
            })


            // axios.post('http://172.19.26.60:8081/rest/user/headurl', param, config)
            //     .then(res => {
            //     if (res.data.code === 0) {
            //         self.ImgUrl = res.data.data
            //     }
            //     console.log(res.data)
            //     })
            },
        showCityList(){
            this.showCity = !this.showCity
        },
        confirm(res){
            console.log(res)
        }
    },
    mounted(){
        this.userInfo = JSON.parse(this.$store.state.userInfo)
        this.nickname = this.userInfo.nickname
        this.gender = this.userInfo.gender
        this.birthday = this.userInfo.birthday
        this.city = this.userInfo.city
        this.signature = this.userInfo.signature
    },
 

}
</script>

<style scoped>
.messageTop{
    width: 100%;

    padding: 0 10px;
    box-sizing: border-box;
}
.messageTop li{
    height: 40px;
    font-size: 14px;
    width: 100%;
    border-bottom: 1px solid #e3e3e3;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.messageTop li img{
    width: 30px;
    height:30px;
    border-radius: 50%;
}
.messageTop li input{
    border: none;
    width: 70px;
    text-align: end;
    
}
.editMessage{
        padding-top: 44px;
    }
</style>