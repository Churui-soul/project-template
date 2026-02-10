// uno.config.ts
import presetTheme from 'unocss-preset-theme'
import type { Theme } from 'unocss/preset-uno'
import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
    // 自定义亮色主题样式
    theme: {
        textColor: {
            '1': '#333'
        },
        backgroundColor: {
            'screen': '#ffffff',
        },
    },
    presets: [presetUno(), presetIcons(), presetAttributify(), presetTheme<Theme>({
        prefix: '--c',
        selectors: {
            dark: ':root[color-scheme=dark]',
            light: ':root[color-scheme=light]',
        },
        theme: {
            // 自定义暗色主题样式
            dark: {
                // 匹配到：
                // 匹配到：text-color-[xxx]
                textColor: {
                    '1': '#fff'
                },
                // 匹配到：bg-[xxx]
                backgroundColor: {
                    'screen': '#141414',
                },
            }
        }
    })],
    // 自定义样式类匹配器
    rules: [
        [/^p-(\d+)$/, match => ({ padding: `${(match[1] as unknown as number || 1) / 4}rem` })],
    ],
    // 自定义通用样式类
    shortcuts: {
        'theme-btn': 'w-50px h-50px leading-50px select-none cursor-pointer border-solid border-2 rounded-full text-center text-color-1'
    },
})
