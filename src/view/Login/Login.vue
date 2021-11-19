<template>
    <div class="login">
        <div class="top">
            <!-- <img src="./img/104.png" alt=""> -->
            <p>中银富登</p>
        </div>
        <div class="mainContent pd2" v-show="!showFlag">
            <div class="iptContent">
                <input type="text" placeholder="请输入手机号或者邮箱" maxlength="11" v-model="telOrmail">
                <input type="password" placeholder="请输入登录密码" v-model="password">
            </div>
            <div class="btnContent">
                <button class="themeBtn" @click="telmailLogin()">
                    登录
                </button>
                <button class="themeBtn2" @click="checkLogin('sms')">
                    用短信验证码登录
                </button>
            </div>
        </div>
        <div class="mainContent pd2" v-show="showFlag">
            <div class="iptContent " style="padding-top:30px;box-sizing:border-box;">
                <input type="num" placeholder="输入手机号" v-model="tel">
            </div>
            <div class="btnContent">
                <button class="themeBtn" @click="smsLogin()">
                    获取验证码
                </button>
                <button class="themeBtn2" @click="checkLogin('no')">
                    用账号密码登录
                </button>
            </div>
        </div>
        <div class="bottom ">
            <div class="bottomeTop pd2">
                <p class="firstLine"></p>
                <p class="p">其他登录方式</p>
                <p class="secondLine"></p>
            </div>
            <div class="bottomBot">
                <img src="./img/ewm.png" @click="ewmLogin()" alt="">
            </div>
        </div>
        
        <!-- 二维码遮罩 -->
        <div class="ewmBg" v-show="showBg"></div>
        <div class="ewmBg2" v-show="showBg">
            <span @click="close()">关闭</span>
            <!-- <div id="qrcode"></div> -->
        </div>
    </div>
</template>

<script>

import { Toast } from 'vant';

export default {
    components: {  
        [Toast.name]: Toast
    },
    created(){
        
    },
    mounted(){
            clearInterval(this.timer)
            this.timer = setInterval(() => {
               if(this.showBg){
                    this.forEwmState() 
               }
            }, 3000);
    },
    data(){
        return{
            telOrmail:'',
            password:'',
            tel:'',
            showFlag:false,
            unikey:'',
            ewmImg:'',
            showBg:false,
            timer:null
        }
    },
    methods:{
       
        checkLogin(flag){
            console.log(flag)
            if(flag === 'sms'){
                this.showFlag = !this.showFlag
            }else{
                this.showFlag = !this.showFlag
            }
        },
        //手机号邮箱登录
       async telmailLogin(){
        //    if(!this.telOrmail){
        //        alert('手机号不能为空')
        //        return
        //    }
        //    if(!this.password){
        //        alert('密码不能为空')
        //        return 
        //    }
          let res =  await this.$request('/login/cellphone',{
                    phone:'18735495269',
                    // phone:this.telOrmail,
                    password:'xuan18735495269',
                    // password:this.password,
                    withCredentials:true,
                }
            )
            if(res.data.code == 200){
                console.log(res.data + '=====')
                window.sessionStorage.setItem('token',JSON.stringify(res.data.token))
                window.sessionStorage.setItem('cookie',JSON.stringify(res.data.cookie))
                this.$store.commit('addUserInfo',JSON.stringify(res.data.profile))
                Toast.success('登录成功');
                this.$router.replace({name:'home'});
            }
        },
        async smsLogin(){
           let res  = await this.$request('/captcha/sent',{phone:this.tel,})
             console.log(res)
             if(res.data.code == '200'){
                 Toast.success('短信验证码发送成功');
                 this.$router.push({name:'smsLoginPage',params:{tel:this.tel}})
             }else if(res.data.code == '400'){
                 Toast.success(res.data.message)
             }

         },
        //二维码登录
        ewmLogin(){
            //生成二维码key
            request({
                url:'/login/qr/key',
            }).then(res=>{
                console.log(res)
                if(res.data.data.code == '200'){
                    this.unikey = res.data.data.unikey
                    //生成二维码
                     request({
                         url:'/login/qr/create',params:{key:this.unikey}
                    }).then(res=>{
                        console.log(res)
                        this.ewmImg = res.data.data.qrurl
                        this.showBg = !this.showBg
                        this.qrcode(this.ewmImg)
                    })
                }
            })
        },
        //轮循二维码接口
        forEwmState(){
            request({
                url:'/login/qr/check',
                params:{
                    key:this.unikey
                }
            }).then(res=>{
                    // console.log(res)
                var result =res.data.code
                if(result == '801'){
                    Toast('等待扫码')
                }else if(result == '800'){
                    Toast('二维码已过期,请重新获取')
                    clearInterval(this.timer)
                    return

                }else if(result == '803'){
                    clearInterval(this.timer)
                    Toast('授权成功')

                }
            })
        },
        close(){
            this.showBg = !this.showBg
            $('.ewmBg2 #qrcode').remove()
        }
    }
}
</script>

<style scoped>
    .login{
        width: 100vw;
        height: 100vh;
        /* background-color: #ccc; */
    }
    .pd2{
        
        padding: 0 .533333rem;
    }
    .pt3{
        padding-top: .8rem;
    }
    .top{
        height:10.666667rem;
        width: 100%;
        background-color: #fff;
        display: flex;
        justify-content:center;
        align-items:center;
        flex-direction: column;
    }
    .top img{
        margin-bottom: .533333rem;
        width: 4.666667rem;
        height: 4.666667rem;
    }
    .iptContent{
        width: 100%;
        height: 4.666667rem;
        /* background-color: skyblue; */
    }
   
    .iptContent input{
        width: 100%;
        border: none;
        border-bottom: 1px solid #f4f4f4;
        height: 2.2rem;
        outline: none;
    }
    .btnContent{
        width: 100%;
        height: 7.333333rem;
        display: flex;
        flex-direction: column;
        margin-top: 1.333333rem;
        align-items: center;
    }
    .btnContent button{
        margin-bottom: .833333rem;
    }
    .bottom{
        position: absolute;
        bottom: 0;
        height: 8.333333rem;
        width: 100%;


    }
    .bottomeTop{
        height: 1.066667rem;

        display: flex;
        align-items: center;
    }
    .bottomeTop p{
        flex: 1;
        text-align: center;
        font-size: .32rem;
    }
    .bottomeTop .firstLine,.bottomeTop .secondLine{
        border-top: 1px solid #ccc;
    }
    .bottomBot{
        width: 100%;
        height: 4.333333rem;
       text-align: center;

    }
    .bottomBot img{
        width: 2.666667rem;
        height: 2.666667rem;
        margin-top: .533333rem;
    }
    .ewmBg{
        width: 100vw;
        height: 100vh;
        background-color: #ccc;
        position: fixed;
        top: 0;
        opacity: 0.6;
    }
    .ewmBg2{
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        opacity: 0.6;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .ewmBg2 span{
        position: absolute;
        right: 1.333333rem;
        top: 1.333333rem;
    }
</style>
    
    
