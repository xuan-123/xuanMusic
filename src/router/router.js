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
const LikeMusicListPage = () => import('../view/My/MyPageComp/LikeMusicListPage.vue')
const MusicDanPage = () => import('../view/My/MyPageComp/MusicDanPage.vue')
const EditMusicList = () => import('../view/My/MyPageComp/EditMusicList.vue')
const MyCommentPage = () => import('../view/My/MyPageComp/MyCommentPage.vue')
const DayMusic = () => import('../view/Home/HomeComponent/DayMusic.vue')
const MusicGroup = () => import('../view/Home/HomeComponent/MusciGroup/MusicGroup')
const EditGroup = () => import('../view/Home/HomeComponent/MusciGroup/EditGroup')
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
        meta:'??????',
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
        meta:'??????',
    },
    {
        path:'/my',
        component:My,
        name:'my',
        meta:'??????'
    },
    {
        path:'/likemusiclistPage',
        component:LikeMusicListPage,
        name:'likemusiclistPage',
        meta:'????????????'
        
    },
    
    {
        path:'/musicdanpage/:id',
        component:MusicDanPage,
        name:'musicdanpage',
        meta:'????????????'
        
    },
    {
        path:'/editmusiclist/:id',
        component:EditMusicList,
        name:'editmusiclist',
        meta:'????????????'
        
    },
    {
        path:'/mycommentpage',
        component:MyCommentPage,
        name:'mycommentpage',
        meta:'????????????'
        
    },
    {
        path:'/boke',
        component:BoKe,
        name:'boke',
        meta:'??????'
    },
    {
        path:'/kmusic',
        component:Kmusic,
        name:'kmusic',
        meta:'K???'
    },
    {
        path:'/yuncun',
        component:YunCun,
        name:'yuncun',
        meta:'??????'
    },
    {
        path:'/searchsong', //???????????????
        component:SearchSong,
        name:'searchsong',
        meta:'??????',
        children:[
            {
                path:'',
                component:SearchPre,
            },
            {
                path:'searchpre',//????????????
                component:SearchPre,
            },
            {
                path:'searchtab',//??????????????????
                component:SearchTab,
            },
            {
                path:'searchinfo/:id',//??????????????????
                component:SearchInfo,
            }
        ]
    },
    {
        path:'/searchsinger', //????????????????????????
        component:SearchSinger,
    },
    {
        path:'/singerdetail/:id', //????????????????????????
        component:SingerDetail
    },
    {
        path:'/lisinemusic/:id',
        component:LisineMusic,
        name:'lisinemusic',
        meta:'??????'
    },
    {
        path:'/musiccomment/:id',
        component:MusicComment,
        name:'musiccomment',
        meta:'?????????'
    },
    {
        path:'/usermain/:id',
        component:UserMain,
        name:'usermain',
        meta:'???????????????'
    },
    {
        path:'/userlevel',
        component:UserLevel,
        name:'userlevel',
        meta:'??????'
    },
    {
        path:'/followedpage/:id',
        component:FollowedPage,
        name:'followedpage',
        meta:'????????????'
    },
    {
        path:'/usereditmasseg',
        component:userEditMasseg,
        name:'usereditmasseg',
        meta:'????????????'
    },
    {
        path:'/mv/:id',
        component:Mv,
        name:'mv',
        meta:'mv??????'
    },
    {
        path:'/daymusic',
        component:DayMusic,
        name:'daymusic',
        meta:'????????????'
    },
    {
        path:'/musicgroup',
        component:MusicGroup,
        name:'musicgroup',
        meta:'????????????'
    },
    {
        path:'/editgroup',
        component:EditGroup,
        name:'editgroup',
        meta:'????????????'
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

