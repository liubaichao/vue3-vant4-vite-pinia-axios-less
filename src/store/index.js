import { defineStore } from "pinia";
const { VITE_ENV } = import.meta.env
console.log( VITE_ENV)
export const useStore = defineStore("app",{
    // 开启数据持久化
    persist:true,
    state: () => {
        return {
            loginInfo: {
                user: {
                    Uid: VITE_ENV === 'dev' ? 'a3a8dbb5-a82e-44a3-bb17-e530d9dbc282' : ''
                }
            },
            openid: VITE_ENV === 'dev' ? 'o4a5S6Uq7V_uKigBAfAiaHP9x7Cw' : ''
        }
    },
    getters:{},
    actions:{
        setLoginInfo(val){
            this.loginInfo = val
        },
        setOpenid(val){
            this.openid = val
        }
    }
})