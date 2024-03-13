import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { resolve } from 'path'

const pathResolve = (dir: string): any => {
return resolve(__dirname, '.', dir);
}

// https://cn.vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Unocss(),
    ],
    resolve: {
        alias: [
            { find: '@', replacement: pathResolve('./src') }
        ]
    }
})
