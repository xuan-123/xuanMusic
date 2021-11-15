
<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>


<script type="text/ecmascript-6">

/**
 * 注：
 * 被Bscroll包裹的元素不支持fixed，因为插件滚动使用了transfrom,fixed不支持
 * 
 */
  import BScroll from 'better-scroll'

  export default {
    name:'bscroll',
      data(){
          return {
              scroll:null
          }
      },
    props: {
      /**
       * 1 滚动的时候会派发scroll事件，会截流。
       * 2 滚动的时候实时派发scroll事件，不会截流。
       * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
       */
      probeType: {
        type: Number,
        default: 3 
      },
      /**
       * 点击列表是否派发click事件
       */
      click: {
        type: Boolean,
        default: true
      },
      /**
       * 是否开启横向滚动
       */
      scrollX: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发滚动事件
       */
      listenScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 列表的数据
       */
      data: {
        // type: Array,
        default: null
      },
       /**
       * 有时候我们使用 BetterScroll 在某个方向模拟滚动的时候，希望在另一个方向保留原生的滚动
       */
      eventPassthrough:{
        type:String,
        default:null
      },
      /**
       * 是否派发滚动到底部的事件，用于上拉加载
       */
      pullup: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发顶部下拉的事件，用于下拉刷新
       */
      pulldown: {
        type: Boolean,
        default: false
      },
      scrollYpos:{
        type: Number,
        default: 0
      },
      cateFlag:{
        type: String,
        default: '1'
      }
      /**
       * 是否派发列表滚动开始的事件
       */
    //   beforeScroll: {
    //     type: Boolean,
    //     default: false
    //   },
      /**
       * 当数据更新后，刷新scroll的延时。
       */
    //   refreshDelay: {
    //     type: Number,
    //     default: 20
    //   }
    },
    mounted() {
      // 保证在DOM渲染完毕后初始化better-scroll
      //注:如下使用nextTick可能会不生效，不生效就使用setTimeout来控制延迟加载，
      //一般设置20ms，但有时不生产可以将这个值调大，
      //不生效的解决办法，可以将页面数据传进data中进行监听
      // this.$nextTick(function(){
      //   this._initScroll()
      //   // this.refresh()
      // })
      setTimeout(() => {
         this._initScroll()
      }, 20);


    },
    methods: {
      
      _initScroll() {
        
        if (!this.$refs.wrapper) {
          return
        }
        // better-scroll的初始化
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          scrollX: this.scrollX,
          disableTouch: false ,
          eventPassthrough:this.eventPassthrough
        })
        // 是否派发滚动事件
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }

        // 是否派发滚动到底部事件，用于上拉加载
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {//监听Bscroll插件内部的触底方法
            // 滚动到底部
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) { //maxScorllY是内部固有的属性值 
              this.$emit('scrollToEnd') //通过子父组件发送出一个事件，用于页面接收
            }
          })
        }

        // 是否派发顶部下拉事件，用于下拉刷新
        if (this.pulldown) {
          this.scroll.on('touchEnd', (pos) => {
            // 下拉动作
            if (pos.y > 50) {
              this.$emit('pulldown')
            }
          })
        }

        // 是否派发列表滚动开始的事件
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
    //   disable() {
    //     // 代理better-scroll的disable方法
    //     this.scroll && this.scroll.disable()
    //   },
    //   enable() {
    //     // 代理better-scroll的enable方法
    //     this.scroll && this.scroll.enable()
    //   },
      refresh() {
        // 代理better-scroll的refresh方法
        this.scroll && this.scroll.refresh()
        console.log('刷了')
      },
      scrollTo() {
        // 代理better-scroll的scrollTo方法
        //组件使用方法：this.$refs.ref名.scrollTo()
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
    //   scrollToElement() {
    //     // 代理better-scroll的scrollToElement方法
    //     this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    //   }
    },
    watch: {
      // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
      data:{ 
        handler(newText,oldText){
          setTimeout(() => {
            this.refresh()//数据更新后先刷新一下scroll组件
            // this.scrollTo(0,0)//数据每次更新将滚动到顶部
          }, this.refreshDelay)
        },
        immediate:true,
      
      },
      cateFlag:{
         handler(newText,oldText){
           console.log(newText)
          setTimeout(() => {
            console.log(newText+'11111111')
            // if(newText == '1'){
              this.scrollTo(0,this.scrollYpos)//数据每次更新将滚动到顶部
              console.log(this.scrollYpos)
            // }else{
              // this.scrollTo(0,0)//数据每次更新将滚动到顶部

            // }
          }, this.refreshDelay)
        },
        immediate:true,
      }
    }
  }
</script>
<style scoped>


</style>
