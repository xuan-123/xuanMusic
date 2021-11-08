<template>
  <div id="app">

    <keep-alive include="Home">
       <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
      
  }
}
</script>

<style>
*{
  margin:0; 
  padding: 0;
}
:root {
	--theme-color: #F37521; /* 主题单色 */
	--gradient-btn: linear-gradient(-84deg,rgba(243,117,33,1),rgba(227,90,51,1)); /* 按钮的渐变主题色 */
	--shadow-btn: 0rem 0rem 0rem 0rem rgba(249,149,136,0.86); /* 按钮阴影 */
	--gradient-card: linear-gradient(-84deg,rgba(243,117,33,1),rgba(227,90,51,1)); /* 卡片的渐变主题色 */
	--shadow-card: 0rem 0rem 0rem 0rem rgba(249,149,136,0.86); /* 按钮阴影 */
}
/* 主题按钮 */
button.themeBtn{
	display: block;
	width: 90%;
	height: 2.666667rem;
  border: none;
	color: #fff;
	background: var(--gradient-btn);
	box-shadow: var(--shadow-btn);
	border-radius: 3.25vh;
  outline: none;

}
button.themeBtn2{
	display: block;
	width: 90%;
	height: 2.666667rem;
  border: none;
  background-color: #fff;
  border: 1px solid rgba(243,117,33,1);
	/* box-shadow: var(--shadow-btn); */
	border-radius: 3.25vh;
  color: rgba(243,117,33,1);
  outline: none;
}
.pd2{
        
        padding: 0 .533333rem;
    }
</style>
