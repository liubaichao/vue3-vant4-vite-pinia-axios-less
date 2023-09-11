<script setup name="/">
import { getCurrentInstance , onBeforeMount } from "vue";
// import { getLogin } from '@/api/index.js'

// const login = async () =>{
//     let awe = await getLogin({name:'1'})
//     console.log(awe,'====')
// }
// login()
// onBeforeMount(async ()=>{
//     let awe = await getLogin({name:'1'})
//     console.log(awe,'====')
// })
// 全局变量
const { proxy } = getCurrentInstance()
console.log('当前环境变量:',proxy.$getEnv)

import HelloWorld from '@/components/HelloWorld.vue'
import TheWelcome from '@/components/TheWelcome.vue'
// import { useStore } from '@/store/index'
// import { storeToRefs } from "pinia";
// const store = useStore();
// // 必须把store改为refs，否则无法实时响应 || 直接只用store.loginInfo存在响应式，取值不需要加.value
// const { loginInfo } = storeToRefs(store);

// // 调用store中actions修改store中name值
// const changName = () => {
//     store.setLoginInfo({ token:'刘白超' })
// }

</script>

<template>
    <header>
        <!-- {{loginInfo?.token}}
        <van-button
            @click="changName"
            type="primary"
        >点击改变name</van-button> -->
        <div class="wrapper flex justc alic wrap">
            <!-- <HelloWorld msg="You did it!" /> -->
            <div class="flex justc alic w100 mt20 mb20">
                <img width="100" src="../../assets/img/welfareGroup.jpg"/>
            </div>
            <van-button to='/bindAccount'>绑定英雄</van-button>
            <van-button to='/register'>注册新英雄</van-button>
            <van-button to='/supportSoftware'>英雄列表</van-button>
            <van-button to='/welfare'>刀妹</van-button>
            <van-button to='/contactUs'>呼叫打野</van-button>
            <van-button to='/joinUs'>五排缺一</van-button>
            <van-button to='/scenarioExample'>寒冰射手</van-button>
        </div>
    </header>

    <main>
        <!-- <TheWelcome /> -->
    </main>
</template>

<style lang="less" scoped>
</style>
