<script setup name="register">
import { ref } from "vue";
import { showToast } from 'vant'
import { sendsms , register , openidBind } from '@/api/index.js'
import { useRouter } from 'vue-router'
const router = useRouter()
// 表单
const username = ref('');
const password = ref('');
const confirmPassword = ref('')
const Email = ref('')
const phone = ref('')
const sms = ref('')
const agree = ref(false)
// 短信验证码
const smsTxt = ref('获取验证码')
const disabledSms = ref(false)
const getCode = async () => {
    // 再次验证手机号格式
    if(phone.value){
        const regExp = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if(regExp.test(phone.value) == false){
            showToast('请输入正确手机号')
            return false
        }else{
            const res = await sendsms({ phone: phone.value })
            console.log(res,'res')
        }
    }else{
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
// 确认密码
const passwordType = ref('password')
const isShowPassword = ref(false)
const confirmPasswordType = ref('password')
const isShowConfirmPassword = ref(false)
const checkPassword = (val) => {
    return val == password.value
}
const showPassword = (type) => {
    if(type == 0){
        isShowPassword.value = !isShowPassword.value
        passwordType.value = isShowPassword.value ? '' : 'password'
    }else{
        isShowConfirmPassword.value = !isShowConfirmPassword.value
        confirmPasswordType.value = isShowConfirmPassword.value ? '' : 'password'
    }   
}
// 注册
const onSubmit = async (values) => {
    console.log(values,agree)
    if(agree.value){
        const res = await register(values)
        username.value = ''
        password.value = ''
        confirmPassword.value = ''
        Email.value = ''
        phone.value = ''
        sms.value = ''
        showToast({ 
            message: '关联成功', 
            type: 'success',
            duration: 3000
        })
    }else{
        showToast({ 
            message: '请勾选服务条款'
        })
    }
};

const goBind = () => {
    router.push({
        path: '/bindAccount'
    })
}
</script>

<template>
    <van-form
        @submit="onSubmit"
        class="w100 flex colu h100"
    >
        <header class="flex justc alic mb20 pt20">
            <img
                src='@/assets/img/logo.png'
                width="150"
                height="50"
                class="mt20"
            />
        </header>
        <div class="flex1">
            <van-cell-group inset>
                <van-field
                    v-model="username"
                    name="AccountName"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                    v-model="password"
                    :type="passwordType"
                    name="password"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                    :right-icon="isShowPassword ? 'eye-o' : 'closed-eye'"
                    @click-right-icon="showPassword(0)"
                />
                <van-field
                    v-model="confirmPassword"
                    :type="confirmPasswordType"
                    name="checkPass"
                    placeholder="确认密码"
                    :rules="[{ required: true, validator: checkPassword,message: '两次输入密码不一致' }]"
                    :right-icon="isShowConfirmPassword ? 'eye-o' : 'closed-eye'"
                    @click-right-icon="showPassword(1)"
                />
                <van-field
                    v-model="Email"
                    name="Email"
                    placeholder="邮箱"
                    :rules="[
                    { validateEmpty:false, pattern:/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/, message: '请输入正确邮箱' },
                    { required: true, message: '请填写邮箱' }
                ]"
                />
                <van-field
                    v-model="phone"
                    type="tel"
                    name="MobilePhone"
                    placeholder="手机号"
                    :rules="[
                    { validateEmpty:false, pattern:/^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确手机号' },
                    { required: true, message: '请填写机号' }
                ]"
                />
                <van-field
                    v-model="sms"
                    type="digit"
                    center
                    clearable
                    name="code"
                    placeholder="请输入短信验证码"
                    :rules="[{ required: true, message: '请填写验证码' }]"
                >
                    <template #button>
                        <van-button
                            size="small"
                            type="warning"
                            color="#447377"
                            @click="getCode"
                            style="min-width:78px"
                            :disabled="disabledSms"
                        >{{ smsTxt }}</van-button>
                    </template>
                </van-field>
            </van-cell-group>
            <div class="tc fz12 color3 flex alic justc mt20">
                <van-checkbox
                    v-model="agree"
                    shape="square"
                    icon-size="16px"
                    checked-color="#084F54"
                >我已阅读并同意</van-checkbox>
                <router-link to="/privacyClause"><span class="color19">《隐私条款》</span></router-link>
                <router-link to="/serviceAgreement"><span class="color19">《服务协议》</span></router-link>
                
            </div>
        </div>
        <div style="margin: 16px;">
            <van-button
                block
                type="primary"
                native-type="submit"
                color="#084F54"
            >
                注 册
            </van-button>
        </div>
        <div class="tc lh24 fz12 color3">已有账号 <span class="color19" @click="goBind">去绑定</span></div>
    </van-form>
</template>

<style lang="less" scoped>
</style>
