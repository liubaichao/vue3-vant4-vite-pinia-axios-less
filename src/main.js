// vant4函数形式的组件
import '@/assets/js/vant4.js'
import '@/assets/css/main.css'
import { getQueryString } from '@/assets/js/common.js'
import { showToast } from 'vant'

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
// pinia 共享仓库
import { createPinia ,storeToRefs } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 接口
import { getWechatInfoByCode ,getByOpenid } from '@/api/index'
import { useStore } from '@/store/index'

const pinia = createPinia()
const app = createApp(App)
// 数据持久化
pinia.use(piniaPluginPersistedstate);
// 环境变量挂在全局
app.config.globalProperties.$getEnv = import.meta.env

app.use(pinia)
app.use(router)
app.mount('#app')


// 路由守卫 start
router.beforeEach( async (to, from, next) => {
    const store = useStore();
    // 必须storeToRefs绑定否则拿不到最新值,因为解构破坏了响应式
    const { openid } = storeToRefs(store);
    const { VITE_HOST , VITE_APPID } = import.meta.env
    // 微信公众号appid-开发-基本配置中获取
    const appId = VITE_APPID
    // 获取code后再次跳转路径 window.location.href；例：www.baido.com/#/Home
    const toPath = VITE_HOST + '/#' + to.path
    // 核心步骤，获取code
    const hrefurl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + encodeURIComponent(toPath) + "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
    // 从地址栏获取code
    const code = getQueryString('code')
    // 有openid就放行，单纯为了获取openid，无需关心是否登录，绑定等
    const haveOpenidPass = ['/bindAccount' , '/register']
    // 是否账号绑定了openid  
    const isBindAccount = async () => {
        const resGetInfo = await getByOpenid({ openid: openid.value })
        if(resGetInfo.code === 0){
            if(resGetInfo.data){
                // 已绑定
                store.setLoginInfo(resGetInfo.data)
                next()
            }else{
                // 未绑定 
                // 清空store用户信息
                store.setLoginInfo({
                    user:{
                        Uid:''
                    }
                })
                // contactUs 相当于注册，直接通过
                if(to.path == '/contactUs'){
                    next()
                }else{
                    next({
                        path: '/register'
                    })
                }         
            }
        }else{
            // 请求失败，放行
            showToast(resGetInfo?.info || '请求失败！');
            next()
        }
    }

    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    /* 判断该路由是否需要登录权限 */
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (openid.value) {
            if(haveOpenidPass.includes(to.path)){
                next()
            }else{
                // 处理非prod环境下，控制台异常，报错无法跳转问题
                return isBindAccount()
            } 
        } else { //openId不存在
            if (code) { //根据code获取openId
                const res = await getWechatInfoByCode({ code })
                if (res && res.code == 0) {
                    store.setOpenid(res.data.openid)
                    isBindAccount()
                } else {
                    showToast(res?.info || '请求失败！');
                }
            } else {  //获取code
                window.location.replace(hrefurl)
            }
        }
    } else {
        next()
    }
})
// 路由守卫 end
