import request from '@/assets/js/http.js'
/* 
post请求 isToken是否携带token repeatSubmit是否防止重复提交
export const post = data => request({url: '/login', method:'post', data ,headers: { isToken: false , repeatSubmit: false} })
export const get = params => request({url: '/login', method:'post', params ,headers: { isToken: false , repeatSubmit: false} })
*/

// 根据code获取openid
export const getWechatInfoByCode = params => request({
    url: '/getWechatInfoByCode',
    method: 'get',
    params,
    headers: {
        isToken: false,
        repeatSubmit: false,
        accessKeyId: 'LTAI5tAFCSUDYBEs6QP7Ka4W',
        accessKeySecret: 'YLJckNVjIx59mvnaKk91dN1ltgX4dr'
    }
})

// 跟openid获取信息
export const getByOpenid = params => request({
    url: '/getByOpenid',
    method: 'get',
    params,
    headers: {
        isToken: false,
        repeatSubmit: false,
        accessKeyId: 'LTAI5tAFCSUDYBEs6QP7Ka4W',
        accessKeySecret: 'YLJckNVjIx59mvnaKk91dN1ltgX4dr'
    }
})

// 账号绑定
export const openidBind = params => request({
    url: '/openidBind',
    method: 'get',
    params,
    headers: {
        isToken: false,
        repeatSubmit: false,
        accessKeyId: 'LTAI5tAFCSUDYBEs6QP7Ka4W',
        accessKeySecret: 'YLJckNVjIx59mvnaKk91dN1ltgX4dr'
    }
})

// 微信注册
export const wechatregister = data => request({
    url: '/wechatregister ',
    method: 'post',
    data,
    headers: {
        isToken: false,
        repeatSubmit: true
    }
})

// 账号登录
export const loginByAccount = data => request({
    url: '/login',
    method: 'post',
    data,
    headers: {
        isToken: false,
        repeatSubmit: true
    }
})

// 手机号登录
export const loginByPhone = data => request({
    url: 'bysms',
    method: 'post',
    data,
    headers: {
        isToken: false,
        repeatSubmit: true
    }
})

// 获取短信
export const sendsms = data => request({
    url: '/sendsms',
    method: 'post',
    data,
    headers: {
        isToken: false,
        repeatSubmit: true
    }
})

// 注册
export const register = data => request({
    url: '/register',
    method: 'post',
    data,
    headers: {
        isToken: false,
        repeatSubmit: true
    }
})

// 商品标签
export const getallshoptag = data => request({
    url: '/getallshoptag',
    method: 'post',
    data,
    headers: {
        repeatSubmit: true
    }
})

//商品列表
export const shopList = data => request({
    url: '/simplelist',
    method: 'post',
    data,
    headers: {
        isToken: false,
        repeatSubmit: true
    }
})
