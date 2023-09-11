import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue';

// vant4按需加载 start
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
// vant4按需加载 end

// 组件设置name属性
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    base:'./',
    plugins: [
        vue(),
        vueSetupExtend(),
        Components({
            resolvers: [VantResolver()],
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        host: '0.0.0.0',
        open: true,
    },
    build: {
        // 构建后是否生成 source map 文件
        sourcemap: false,
    }
})
