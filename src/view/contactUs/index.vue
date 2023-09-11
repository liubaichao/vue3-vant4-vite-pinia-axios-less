<script setup name="contactUs">
import { ref , onBeforeMount } from 'vue';
import { showToast } from 'vant'
import { sendsms } from '@/api/index'
import { storeToRefs } from "pinia";
import { useStore } from '@/store/index'
import { wechatregister } from '@/api/index'

const store = useStore();

const show = ref(true)
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

// 提交
const onSubmit = async (values) => {
    const { openid } = storeToRefs(store);
    values.Openid = openid.value
    const res = await wechatregister(values)
    show.value = false
    showToast({
        message: '提交成功',
        type: 'success',
        duration: 3000
    })
};

onBeforeMount(()=>{
    const { loginInfo } = storeToRefs(store);
    show.value = loginInfo.value.user.Uid ? false : true
})
</script>

<template>
    <header class="headerBox flex justc alic">
        <img src='@/assets/img/logo.png' width="150" height="50" />
    </header>
    <div class="contact flex justc alic colu">
        <header class="posRel tc">
            <van-button
                type="warning"
                size="small"
                round
                class="title fz16"
                color="#FE571A"
            >五楼亚索，上中野都行</van-button>
            <div class="lineBox flex posAbs">
                <div class="leftLine posAbs flex alic colu">
                    <div class="line"></div>
                    <div class="pointer"></div>
                </div>
                <div class="rightLine posAbs flex alic colu">
                    <div class="line"></div>
                    <div class="pointer"></div>
                </div>
            </div>
        </header>
        <main class="mainBox bgf ml15 mr15 borBox">
            <div class="flex justc alic mt20 pt10">
                <div class="tc">
                    <div class="icon flex justc alic">
                        <van-icon name="fire-o" size="28" color="#557BCD"/>
                    </div>
                    <div class="fz14 color3 lh30">人头狗</div>
                </div>
                <div class="tc">
                    <div class="icon flex justc alic">
                        <van-icon name="good-job-o" size="28" color="#557BCD"/>
                    </div>
                    <div class="fz14 color3 lh30">托儿索</div>
                </div>
            </div>
            <div class="mt15 fz14 color6 lh24">中路制胜秘籍，活下去的才有资格补兵；打野制胜密集，六级出山请勿呼叫；上路制胜秘籍，和平发育geigei</div>

            <div class="dividerBox flex justs alic">
                <div class="circle"></div>
                <div class="divider flex1"></div>
                <div class="circle"></div>
            </div>
    
            <div class="flex justc alic pt10 pb10">
                <img src="../../assets/img/welfareGroup.jpg" width="80" height="80"/>
                <div class="fz14 color6 lh24 ml20">
                    <div class="color3">托儿索</div>
                    <div>只要E的够快？就追不上我</div>
                    <div>扫码领福利哦</div>
                </div>
            </div>
        </main>
    </div>
    <!-- 主动获取用户信息 -->
    <van-action-sheet v-model:show="show" title="快捷登录" :close-on-click-overlay="false">
        <van-form @submit="onSubmit" class="w100">
            <van-cell-group inset class="cellGroup">
                <van-field v-model="phone" type="tel" name="MobilePhone" placeholder="手机号" :rules="[
                    { validateEmpty: false, pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确手机号' },
                    { required: true, message: '请填写机号' }
                ]" />
                <van-field v-model="sms" type="digit" center clearable name="Code" placeholder="请输入短信验证码"
                    :rules="[{ required: true, message: '请填写验证码' }]">
                    <template #button>
                        <van-button size="small" type="warning" color="#447377" @click="getCode" style="min-width:78px"
                            :disabled="disabledSms">{{ smsTxt }}</van-button>
                    </template>
                </van-field>
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button block type="primary" native-type="submit" color="#084F54">
                    确认
                </van-button>
            </div>
        </van-form>
    </van-action-sheet>
</template>

<style lang="less" scoped>
.headerBox{
    padding: 80px 0 50px 0;
}
.contact {
    width: 100vw;
    .title {
        padding-left: 30px;
        padding-right: 30px;
        letter-spacing: 4px;
    }
    .lineBox {
        width: 100px;
        top: 32px;
        left: calc(50% - 50px);
        .leftLine {
            left: 0;
        }
        .rightLine {
            right: 0;
        }
        .leftLine,
        .rightLine {
            .line {
                height: 40px;
                border-left: 2px solid #FE571A;
            }
            .pointer {
                height: 10px;
                width: 10px;
                background: #FE571A;
                border-radius: 50%;
            }
        }
    }

    .mainBox {
        width: calc(100% - 30px);
        margin-top: 30px;
        border-radius: 4px;
        padding: 15px 30px;
        .icon{
            height: 50px;
            width: 50px;
            margin: 0 20px;
            background: #EBEAFB;
            border-radius: 50%;
        }
        .dividerBox{
            width: calc( 100vw - 10px);
            margin-left: -40px;
            .circle{
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #F5F7FA;
            }
            .divider{
                border-bottom: 1px dashed #dfdfdf;
            }
        }
    }
}
</style>
