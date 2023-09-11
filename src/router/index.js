import { createRouter, createWebHashHistory } from "vue-router";

// 首页
const index = () => import(/* webpackChunkName: 'HomePage' */ '../view/home/index.vue')

// 绑定账号
const bindAccount = () => import(/* webpackChunkName: 'bindAccountPage' */ '../view/bindAccount/index.vue')

// 注册
const register = () => import(/* webpackChunkName: 'registerPage' */ '../view/register/index.vue')

// 隐私条款
const privacyClause = () => import(/* webpackChunkName: 'registerPage' */ '../view/register/privacyClause.vue')

// 服务协议
const serviceAgreement = () => import(/* webpackChunkName: 'registerPage' */ '../view/register/serviceAgreement.vue')

// 场景示例
const scenarioExample = () => import(/* webpackChunkName: 'scenarioExamplePage' */ '../view/scenarioExample/index.vue')

// 支持软件
const supportSoftware = () => import(/* webpackChunkName: 'supportSoftwarePage' */ '../view/supportSoftware/index.vue')

// 社区福利
const welfare = () => import(/* webpackChunkName: 'welfarePage' */ '../view/welfare/index.vue')

// 联系我们
const contactUs = () => import(/* webpackChunkName: 'contactUsPage' */ '../view/contactUs/index.vue')

// 加入我们
const joinUs = () => import(/* webpackChunkName: 'joinUsPage' */ '../view/joinUs/index.vue')

const router = new createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: '/',
            component: index,
            meta: {
                title: '首页',
                requireAuth: false
            }
        },
        {
            path: '/bindAccount',
            name: 'bindAccount',
            component: bindAccount,
            meta: {
                title: '绑定账号',
                requireAuth: true
            }
        },
        {
            path: '/register',
            name: 'register',
            component: register,
            meta: {
                title: '注册',
                requireAuth: true,
                keepalive: true
            }
        },
        {
            path: '/privacyClause',
            name: 'privacyClause',
            component: privacyClause,
            meta: {
                title: '隐私条款',
                requireAuth: false
            }
        },
        {
            path: '/serviceAgreement',
            name: 'serviceAgreement',
            component: serviceAgreement,
            meta: {
                title: '服务协议',
                requireAuth: false
            }
        },
        {
            path: '/scenarioExample',
            name: 'scenarioExample',
            component: scenarioExample,
            meta: {
                title: '场景示例',
                requireAuth: false
            }
        },
        {
            path: '/supportSoftware',
            name: 'supportSoftware',
            component: supportSoftware,
            meta: {
                title: '支持软件',
                requireAuth: false
            }
        },
        {
            path: '/welfare',
            name: 'welfare',
            component: welfare,
            meta: {
                title: '社区福利',
                requireAuth: false
            }
        },
        {
            path: '/contactUs',
            name: 'contactUs',
            component: contactUs,
            meta: {
                title: '联系我们',
                requireAuth: true
            }
        },
        {
            path: '/joinUs',
            name: 'joinUs',
            component: joinUs,
            meta: {
                title: '加入我们',
                requireAuth: false
            }
        },
    ]
})

export default router