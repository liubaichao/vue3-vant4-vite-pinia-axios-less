import { local } from './common.js'
const Token = 'vue_wechat_user_token'
const showVconsole = 'showVconsole'

// token
export function getToken() {
    return local.get(Token)
}

export function setToken(token) {
    return local.set(Token, token)
}

export function removeToken() {
    return local.remove(Token)
}

// 控制vconsole展示
export function getShowVconsole() {
    return local.get(showVconsole)
}

export function setShowVconsole(isShow) {
    return local.set(showVconsole, isShow)
}

export function removeShowVconsole() {
    return local.remove(showVconsole)
}
