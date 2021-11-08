<template>
    <div class="toast" v-show="isShow">
            {{message}}
    </div>
</template>

<script>
export default {
    data(){
        return{
            isShow:false,
            message:'加载中。。。'
        }
    },
    methods:{
        show(message,duration=2000){
            this.isShow = true;
            this.message = message
            setTimeout(()=>{
                this.isShow = false
                this.message = ''
            },duration)
        },
        showLongTime(message){
            this.message = message
            this.isShow = true;
        },
        closeLongTime(message){
            this.message = message
            this.isShow = false;
        }
    }
}
</script>

<style>
    .toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  color: aliceblue;

  z-index: 9999;

  background-color: rgba(0, 0, 0, 0.75);
}

</style>