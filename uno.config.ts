// uno.config.ts
import presetTheme from 'unocss-preset-theme'
import type { Theme } from 'unocss/preset-uno'
import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
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
            dark: {
                textColor: {
                    '1': '#fff'
                },
                backgroundColor: {
                    'screen': '#141414',
                },
            }
        }
    })],
    rules: [
        ['m-1', { margin: '0.25rem' }],
        [/^p-(\d+)$/, match => ({ padding: `${(match[1] as unknown as number || 1) / 4}rem` })],
    ],
    shortcuts: {
        'theme-btn': 'w-50px h-50px leading-50px select-none cursor-pointer border-solid border-2 rounded-full text-center text-color-1'
    },
})
