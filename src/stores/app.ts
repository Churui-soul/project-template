import { defineStore } from 'pinia'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
    attribute: 'color-scheme',
    valueDark: 'dark',
})
const toggleDark = useToggle(isDark)

export const useAppStore = defineStore('app', {
    state: () => {
        return {
            isDark,
        }
    },
    getters: {},
    actions: {
        toggleDark(event: MouseEvent) {
            if ('startViewTransition' in document) {
                const x = event.clientX
                const y = event.clientY
                const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

                // 动态创建style标签，设置伪元素样式
                const addStyle = () => {
                    const style = document.createElement('style')
                    style.id = 'dynamic-view-transition' // 加id方便后续删除
                    style.textContent = `
                        ::view-transition-new(root) {
                            z-index: ${isDark.value ? 2147483646 : 1};
                        }
                        ::view-transition-old(root) {
                            z-index: ${isDark.value ? 1 : 2147483646};
                        }
                    `
                    // 插入到head中
                    document.head.appendChild(style)

                    setTimeout(() => {
                        document.head.removeChild(document.getElementById('dynamic-view-transition')!)
                    }, 350)
                }
                addStyle()

                const transition = (document.startViewTransition as Function)(async () => {
                    toggleDark()
                })

                transition.ready.then(() => {
                    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
                    document.documentElement.animate(
                        {
                            clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
                        },
                        {
                            duration: 350,
                            easing: isDark.value ? 'ease-in' : 'ease-out',
                            pseudoElement: isDark.value ? '::view-transition-old(root)' : '::view-transition-new(root)',
                        }
                    )
                })
            } else {
                toggleDark()
            }
        },
    },
})
