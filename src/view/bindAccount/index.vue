<script setup name='bindAccount'>
import { ref } from "vue";
import { loginByAccount, loginByPhone, sendsms, openidBind } from '@/api/index'
import { setToken, getShowVconsole, setShowVconsole, removeShowVconsole } from '@/assets/js/auth'
import { isShowVconsole } from '@/assets/js/common.js'
import { useStore } from '@/store/index'
import { showToast } from 'vant'
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useStore();

// 点击打开vconsole start
let count = 0
let lastClickTime = 0
let vConsole = isShowVconsole() ? new window.VConsole() : ''
const openVconsole = () => {
    const nowTime = new Date().getTime();
    if (nowTime - lastClickTime < 3000) {
        count++;
    } else {
        count = 0;
    }
    lastClickTime = nowTime;
    if (count >= 10) {
        count = 0;
        if (getShowVconsole()) {
            vConsole.destroy();
            removeShowVconsole()
        } else {
            vConsole = new window.VConsole()
            setShowVconsole(true)
        }
    }
}
// 点击打开vconsole end

// tab
const active = ref(0);
// 表单
const username = ref('');
const password = ref('');
const phone = ref('')
const sms = ref('')
// 短信验证码
const smsTxt = ref('获取验证码')
const disabledSms = ref(false)
const getCode = async () => {
    // 再次验证手机号格式
    if (phone.value) {
        const regExp = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (regExp.test(phone.value) == false) {
            showToast('请输入正确手机号')
            return false
        } else {
            const res = await sendsms({ phone: phone.value })
            console.log(res, 'res')
        }
    } else {
        showToast('请输入手机号')
        return false
    }
    let second = 60;
    smsTxt.value = second;
    disabledSms.value = true
    const timer = setInterval(() => {
        second--;
        if (second) {
            smsTxt.value = second;
        } else {
            clearInterval(timer);
            smsTxt.value = '获取验证码'
            disabledSms.value = false
        }
    }, 1000);
}
// 绑定
const onSubmit = async (values) => {
    if (active.value == 0) {
        // 账号登录
        const res = await loginByAccount(values)
        setToken(res.data.token)
        store.setLoginInfo(res.data)
    } else {
        // 手机号登录
        const res = await loginByPhone(values)
        setToken(res.data.token)
        store.setLoginInfo(res.data)
    }
    bindAccountHand()
};
// 绑定账号
const bindAccountHand = async () => {
    const { loginInfo, openid } = storeToRefs(store);
    if (!loginInfo.value.user.Uid) {
        showToast({
            message: 'Uid不存在',
            type: 'fail',
            duration: 3000
        })
        return false
    }
    if (!openid.value) {
        showToast({
            message: 'openid不存在',
            type: 'fail',
            duration: 3000
        })
        return false
    }
    const bindRes = await openidBind({
        openid: openid.value,
        uid: loginInfo.value.user.Uid
    })
    username.value = ''
    password.value = ''
    showToast({
        message: '关联成功',
        type: 'success',
        duration: 3000
    })
}

const goRegister = () => {
    router.push({
        path: '/register',
        query: {
            openid: '666'
        }
    })
}

</script>

<template>
    <div class="flex justc alic h100">
        <van-form @submit="onSubmit" class="w100">
            <header class="flex justc alic pb20 pt20 mt20">
                <img src='@/assets/img/logo.png' width="150" height="50" @click="openVconsole" />
            </header>
            <van-cell-group inset class="cellGroup">
                <van-tabs v-model:active="active" color='#084F54' class="mb5">
                    <van-tab title="账号密码"></van-tab>
                    <van-tab title="手机号码"></van-tab>
                </van-tabs>
                <van-field v-model="username" name="account" placeholder="用户名/邮箱/手机号"
                    :rules="[{ required: true, message: '请填写用户名' }]" v-if='active == 0' />
                <van-field v-model="password" type="password" name="password" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" v-if='active == 0' />
                <van-field v-model="phone" type="tel" name="phone" placeholder="手机号" :rules="[
                    { validateEmpty: false, pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确手机号' },
                    { required: true, message: '请填写机号' }
                ]" v-if='active == 1' />
                <van-field v-model="sms" type="digit" center clearable name="code" placeholder="请输入短信验证码"
                    :rules="[{ required: true, message: '请填写验证码' }]" v-if='active == 1'>
                    <template #button>
                        <van-button size="small" type="warning" color="#447377" @click="getCode" style="min-width:78px"
                            :disabled="disabledSms">{{ smsTxt }}</van-button>
                    </template>
                </van-field>
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button block type="primary" native-type="submit" color="#084F54">
                    确认绑定
                </van-button>
            </div>
            <div class="tc lh24 fz12 color3">暂无账号 <span class="color19" @click="goRegister">去注册</span></div>
        </van-form>
    </div>
</template>

<style lang="less" scoped>
.cellGroup {
    min-height: 146px;
}
</style>
