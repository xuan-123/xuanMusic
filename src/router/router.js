import Vue from 'vue'
import VueRouter from 'vue-router'

const Login =()=> import('../view/Login/Login.vue')
const smsLoginPage = ()=> import('../view/Login/smsLoginPage.vue')
const Home =()=> import('../view/Home/Home.vue')
const My =()=> import('../view/My/My.vue')
const BoKe =()=> import('../view/BoKe/BoKe.vue')
const Kmusic =()=> import('../view/Kmusic/Kmusic.vue')
const YunCun =()=> import('../view/YunCun/YunCun.vue')
const Mv =()=> import('../view/YunCun/Mv.vue')
const SearchSong= ()=> import('../components/HomeSearch/SearchSong.vue')
const SearchPre = () => import('../components/HomeSearch/SearchRouter/SearchPre.vue')
const SearchTab = () => import('../components/HomeSearch/SearchRouter/SearchTab.vue')
const SearchInfo = () => import('../components/HomeSearch/SearchRouter/SearchInfo.vue')
// const SearchSinger = () => import('../components/HomeSearch/SearchRouter/SearchSinger.vue')
const SearchSinger= ()=> import('../components/HomeSearch/SearchSinger.vue')
const SingerDetail= ()=> import('../components/HomeSearch/SearchSiner/SinerDetail.vue')
const LisineMusic= ()=> import('../components/LisineMusic/LisineMusic.vue')
const MusicComment= ()=> import('../components/LisineMusic/MusicComment.vue')
//UserInfo
const UserMain= ()=> import('../view/My/userMainCompon/UserMain.vue')
const UserLevel= ()=> import('../view/My/userLeverCompon/UserLevel.vue')
const userEditMasseg= ()=> import('../view/My/userEditMassegCompon/userEditMasseg.vue')
const FollowedPage = ()=> import('../view/My/userMainCompon/FollowedPage.vue')

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location){
    return originalPush.call(this,location).catch(err=>err)
}
const routes = [
    {
        path:'',
        redirect:'/login'
    },
    {
        path:'/login',
        component:Login,
        name:'login',
        meta:'登录',
    },
    {
        path:'/smsLoginPage/:tel',
        name:'smsLoginPage',
        component:smsLoginPage
    },
    {
        path:'/home',
        component:Home,
        name:'home',
        meta:'主页',
    },
    {
        path:'/my',
        component:My,
        name:'my',
        meta:'我的'
    },
    {
        path:'/boke',
        component:BoKe,
        name:'boke',
        meta:'播客'
    },
    {
        path:'/kmusic',
        component:Kmusic,
        name:'kmusic',
        meta:'K歌'
    },
    {
        path:'/yuncun',
        component:YunCun,
        name:'yuncun',
        meta:'云村'
    },
    {
        path:'/searchsong', //音乐搜索页
        component:SearchSong,
        name:'searchsong',
        meta:'搜索',
        children:[
            {
                path:'',
                component:SearchPre,
            },
            {
                path:'searchpre',//搜索首页
                component:SearchPre,
            },
            {
                path:'searchtab',//搜索有导航页
                component:SearchTab,
            },
            {
                path:'searchinfo/:id',//搜索有导航页
                component:SearchInfo,
            }
        ]
    },
    {
        path:'/searchsinger', //搜索页跳歌手分类
        component:SearchSinger,
    },
    {
        path:'/singerdetail/:id', //跳转到歌手信息页
        component:SingerDetail
    },
    {
        path:'/lisinemusic/:id',
        component:LisineMusic,
        name:'lisinemusic',
        meta:'播放'
    },
    {
        path:'/musiccomment/:id',
        component:MusicComment,
        name:'musiccomment',
        meta:'评论页'
    },
    {
        path:'/usermain/:id',
        component:UserMain,
        name:'usermain',
        meta:'用户信息页'
    },
    {
        path:'/userlevel',
        component:UserLevel,
        name:'userlevel',
        meta:'等级'
    },
    {
        path:'/followedpage',
        component:FollowedPage,
        name:'followedpage',
        meta:'粉丝'
    },
    {
        path:'/usereditmasseg',
        component:userEditMasseg,
        name:'usereditmasseg',
        meta:'编辑信息'
    },
    {
        path:'/mv/:id',
        component:Mv,
        name:'mv',
        meta:'mv播放'
    },
    
]
const router = new VueRouter({
    mode:'hash',
    routes
})
router.beforeEach((to,from,next)=>{
    if(to.path === '/login') return next()
    const tokenStr = window.sessionStorage.getItem('token')
    if(!tokenStr) return next('/login')
    next()
})
export default router

