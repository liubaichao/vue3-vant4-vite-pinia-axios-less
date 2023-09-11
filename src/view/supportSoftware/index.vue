<script setup name="supportSoftware">
import { ref } from "vue";
import { getallshoptag ,shopList } from '@/api/index.js'

const typeObj = {
    data: '战士',
    image: 'ADC'
}
const searchValue = ref('')
const onSearch = (val) => {
    listParam.value.Page = 1
    listParam.value.Name = val
    toolListObj.value.list = []
    onLoadList()
}
const onClear = () => {
    listParam.value.Page = 1
    listParam.value.Name = ''
    toolListObj.value.list = []
    onLoadList()
}
// 标签
const tabActive = ref(0)
const tabArr = ref([])
const clickTab = (row) => {
    listParam.value.Page = 1
    listParam.value.Tag = row.title == '全部' ? [] : [ row.title ]
    toolListObj.value.list = []
    onLoadList()
}
const getallshoptagList = async () => {
    let res = await getallshoptag()
    tabArr.value = ['全部',...res.data.shopTag]
}
getallshoptagList()
// 列表
const listParam = ref({
    Name: "",
    Page: 1,
    Count: 18,
    Tag: []
})
const toolListObj = ref({
    list:[],
    total:0
})
const loading = ref(false);
const finished = ref(false);
const onLoadList = async () => {
    loading.value = true;
    const res = await shopList(listParam.value)
    console.log(res)
    // 处理动态加载图片
    const getImageUrl = (name) => {
        return new URL(`/src/assets/img/software/${name}`, import.meta.url).href
    }

    if(res.data.list && res.data.list.length > 0){
        res.data.list.map((n)=>{
            n.Item.Icon = n.Item.Icon?getImageUrl(n.Item.Icon):''
        })
    }else{
        res.data.list = []
    }
    toolListObj.value = {
        list: [...toolListObj.value.list ,...res.data.list],
		total: res.data.total
    }
    loading.value = false;
    if(listParam.value.Page * listParam.value.Count >= res.data.total) {
        finished.value = true;
    }else{
        finished.value = false;
        listParam.value.Page++
    }
};
</script>

<template>
    <header class="headBox flex justc alic">
        <div class="tc">
            <div class="fw fz16 color3 lh30">秦始皇</div>
            <div class="color6 fz12">车同轨，书同文，统一度量衡，建立大一统</div>
        </div>
    </header>
    <van-search
        class="search"
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @clear="onClear"
    />
    <van-tabs v-model:active="tabActive" class="tabsBox" @click-tab='clickTab'>
        <van-tab v-for="(name,index) in tabArr" :title="name" :key="index"></van-tab>
    </van-tabs>
    <van-list
        class="mt10"
        v-model:loading="loading"
        :finished="finished"
        :finished-text="toolListObj.list.length == 0?'暂无数据':'没有更多了'"
        @load="onLoadList"
    >
        <div
            class="toolCard ml15 mr15 mb10 cursor flex justc pl10 pr10 pt10 pb10 borBox"
            v-for="(o, index) in toolListObj.list"
            :key="o"
        >
            <div class="imgBox">
                <img
                    :src="o.Item.Icon"
                    v-if="o.Item.Icon"
                    width="60"
                    height="60"
                />
                <img
                    src="@/assets/img/software/ai.webp"
                    width="60"
                    height="60"
                    v-else
                />
            </div>
            <div class="title color3 flex1 ml20 mr20">
                <div class="fw fz16 color3 txtb">{{ o.Item.Name }}</div>
                <div class="fz12 color6 txtb pt5 pb5">{{ o.Item.Description }}</div>
                <van-tag :type="o.Item.Type == 'data' ? 'primary' : 'success'">{{ typeObj[o.Item.Type] }}</van-tag>
            </div>
        </div>
    </van-list>
</template>

<style lang="less" scoped>
.headBox {
    padding: 40px;
}
.search {
    position: sticky;
    top: 0;
    z-index: 2;
}
.tabsBox{
    position: sticky;
    top: 54px;
    z-index: 2;
}
.toolCard {
    background: #fff;
    border-radius: 4px;
    .imgBox {
        img {
            border-radius: 4px;
        }
    }
}
</style>
