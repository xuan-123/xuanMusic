<template>
    <div class="pd2">
        <p @click="goback()">返回</p>
        <h3 class="fonth">请输入验证码</h3>
        <p class="telFont">验证码已通过短信发送至 +86 {{this.smsTel}}</p>
        <div class="ipt">
            <input type="text" placeholder="请输入验证码" v-model="smsCode">
            <p style="color:skyblue;margin-left:10px" v-show="!showSetSms" @click="resetSms()">重新获取验证码</p>
            <p style="color:#ccc;margin-left:10px" v-show="showSetSms">{{yzmtime}}后可重新获取</p>
        </div>
        <div class="btnContent">
            <button class="themeBtn" @click="smsLogin()">
                登录
            </button>
        </div>
        
    </div>
</template>

<script>
import {request} from '../../network/request'
import { Toast } from 'vant';
export default {
    mounted(){
        console.log(this.$route.params.tel)
        this.smsTel = this.$route.params.tel
        this.setYzm()
    },
    data(){
        return{
            smsCode:'',
            smsTel:'',
            yzmtime:60,
            showSetSms:true

        }
    },
    methods:{
        goback(){
            this.$router.go(-1)
        },
        //验证码倒计时
        setYzm(){
            
            clearInterval(timer)
            var that = this

            var timer = setInterval(() => {
                that.yzmtime-- 
                if(that.yzmtime<=0){
                    this.showSetSms = !this.showSetSms
                    that.yzmtime = 60
                    clearInterval(timer)
                return
            }
            }, 1000);
            
        },
        //重新发送验证码
        resetSms(){
            request({
                url:'/captcha/sent',
                params:{
                    phone:this.smsTel,
                }
            }).then(res=>{
                console.log(res)
                if(res.data.code == '200'){
                    Toast.success('短信验证码发送成功');
                    this.showSetSms = !this.showSetSms
                    this.setYzm()
                }else if(res.data.code == '400'){
                    Toast.success(res.data.message)
                }
            })
        },
        
        //验证验证码并登录
        smsLogin(){
            request({
                    url:'/captcha/verify',
                    params:{
                        phone:this.smsTel,
                        captcha:this.smsCode
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.data.code=='200'){
                        Toast.success('验证成功，不让你登录，去密码登吧。');
                    }
                })
        }
    }
}
</script>

<style scoped>
    .ipt{
        display: flex;
        border-bottom: 1px solid #ccc;
        width: 100%;
        height: 40px;
        /* background-color: #ccc; */
        justify-content: space-between;
        align-items: center;
        margin-top: 1.066667rem;
    }
   .ipt input{
        flex: 6;
        border: none;
    } 
    .ipt p{
        flex: 4;
    } 
    .fonth{
        font-weight: 500; 
        margin: 10px 0;   
    }
    .btnContent{
        margin-top: 2.133333rem;
        display: flex;
        justify-content: center;
    }
    .telFont{
        font-size: 12px;
    }
</style>