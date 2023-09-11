
import { getShowVconsole } from '@/assets/js/auth'

/**
 * 会话级缓存
 */
export const session = {
    set(key, value) {
        if (!sessionStorage) {
            return
        }
        if (key != null && value != null) {
            sessionStorage.setItem(key, value)
        }
    },
    get(key) {
        if (!sessionStorage) {
            return null
        }
        if (key == null) {
            return null
        }
        return sessionStorage.getItem(key)
    },
    setJSON(key, jsonValue) {
        if (jsonValue != null) {
            this.set(key, JSON.stringify(jsonValue))
        }
    },
    getJSON(key) {
        const value = this.get(key)
        if (value != null) {
            return JSON.parse(value)
        }
    },
    remove(key) {
        sessionStorage.removeItem(key);
    }
}

/**
 * 本地缓存
 */
export const local = {
    set(key, value) {
        if (!localStorage) {
            return
        }
        if (key != null && value != null) {
            localStorage.setItem(key, value)
        }
    },
    get(key) {
        if (!localStorage) {
            return null
        }
        if (key == null) {
            return null
        }
        return localStorage.getItem(key)
    },
    setJSON(key, jsonValue) {
        if (jsonValue != null) {
            this.set(key, JSON.stringify(jsonValue))
        }
    },
    getJSON(key) {
        const value = this.get(key)
        if (value != null) {
            return JSON.parse(value)
        }
    },
    remove(key) {
        localStorage.removeItem(key);
    }
}

/**
 * 获取地址栏参数
 */
export const getQueryString = (name) => {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
} 

/**
 * 是否打开vconsole
 * @returns Boolean
 */
export const isShowVconsole = () => {
    //  || import.meta.env.VITE_ENV === 'dev' || import.meta.env.VITE_ENV === 'test'
    if(getShowVconsole()){
        return true
    }else{
        return false
    }
}
