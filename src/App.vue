<script setup lang="ts">
import { useAppStore } from '@/stores/app.ts'
const appStore = useAppStore()

</script>

<template>
    <div
        class="w-screen h-screen"
        flex="~ justify-around items-center"
        bg="screen"
    >
        <div
            class="theme-btn"
            :class="{
                'i-mdi-white-balance-sunny': !appStore.isDark,
                'i-mdi-weather-night': appStore.isDark,
            }"
            @click="appStore.toggleDark"
        ></div>
    </div>
</template>

<style scoped lang="less">
</style>