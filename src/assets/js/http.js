import axios from 'axios'
import { showNotify, showConfirmDialog, showToast } from 'vant'
import { getToken } from './auth.js'
import { session } from './common.js'
import { storeToRefs } from "pinia";
import { useStore } from '@/store/index'

const errorCode = {
    '401': '认证失败，无法访问系统资源',
    '403': '当前操作没有权限',
    '404': '访问资源不存在',
    'default': '请求失败'
}

// 是否显示重新登录
export let isRelogin = { show: false };

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: import.meta.env.VITE_URL,
    // 超时
    timeout: 10000
})

// request拦截器
service.interceptors.request.use(config => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    // 是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
    // 兼容服务器不支持该请求头，删除后不报跨域
    if(config.headers && config.headers.hasOwnProperty('repeatSubmit')){
        delete config.headers.repeatSubmit
    }
    const { loginInfo } = storeToRefs(useStore());
    if (getToken() && !isToken || loginInfo.value.user.Uid) {
        // config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        config.headers['Uid'] = loginInfo.value.user.Uid
    }
    if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
        const requestObj = {
            url: config.url,
            data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
            time: new Date().getTime()
        }
        const sessionObj = session.getJSON('sessionObj')
        if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
            session.setJSON('sessionObj', requestObj)
        } else {
            const s_url = sessionObj.url;                // 请求地址
            const s_data = sessionObj.data;              // 请求数据
            const s_time = sessionObj.time;              // 请求时间
            const interval = 1000;                       // 间隔时间(ms)，小于此时间视为重复提交
            if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
                const message = '数据正在处理，请勿重复提交';
                console.warn(`[${s_url}]: ` + message)
                return Promise.reject(new Error(message))
            } else {
                session.setJSON('sessionObj', requestObj)
            }
        }
    }
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 0;
    // 获取错误信息
    const msg = errorCode[code] || res.data.info || res.data.msg || errorCode['default']
    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
        return res.data
    }
    if (code === 401) {
        if (!isRelogin.show) {
            isRelogin.show = true;
            showConfirmDialog({
                message: '登录状态已过期，您可以继续留在该页面，或者重新登录',
                confirmButtonText: '重新登录'
            }).then(() => {
                // on confirm
                isRelogin.show = false;
            }).catch(() => {
                // on cancel
                isRelogin.show = false;
            });
        }
        return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else if (code === 500) {
        showToast({ message: msg, type: 'fail' })
        return Promise.reject(new Error(msg))
    } else if (code === 601) {
        showToast({ message: msg, type: 'fail' })
        return Promise.reject(new Error(msg))
    } else if (code !== 0) {
        showNotify({ 
            type: 'warning', 
            background: '#084F54',
            message: msg 
        });
        return Promise.reject('error')
    } else {
        return Promise.resolve(res.data)
    }
},
    error => {
        console.log('err' + error)
        let { message } = error;
        if (message == "Network Error") {
            message = "接口连接异常";
        } else if (message.includes("timeout")) {
            message = "接口请求超时";
        } else if (message.includes("Request failed with status code")) {
            message = "接口" + message + "异常";
        }
        showToast({ 
            message: message, 
            type: 'fail', 
            duration: 5 * 1000 
        })
        return Promise.reject(error)
    }
)

export default service
