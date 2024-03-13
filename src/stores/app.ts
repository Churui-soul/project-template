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
            isDark
        }
    },
    getters: {},
    actions: {
        toggleDark(event: MouseEvent) {
            if ('startViewTransition' in document) {
                const x = event.clientX;
                const y = event.clientY;
                const endRadius = Math.hypot(
                    Math.max(x, innerWidth - x),
                    Math.max(y, innerHeight - y)
                )

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
                toggleDark();
            }
        },
    },
})
