<script setup>
import { useRoute } from 'vue-router'
import { isShowVconsole } from '@/assets/js/common'
// vconsole start
let vConsole = isShowVconsole() ? new window.VConsole(): ''
// vconsole end
const route = useRoute()
</script>

<template>
    <router-view v-slot="{ Component }">
        <keep-alive>
            <component
                :is="Component"
                v-if="route.meta.keepalive"
                :key="route.path"
            />
        </keep-alive>
        <component
            :is="Component"
            v-if="!route.meta.keepalive"
            :key="route.path"
        />
    </router-view>
</template>

<style scoped>
</style>
