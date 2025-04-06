<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
    <Layout>
        <template #home-features-before>
            <div class="features-title">
                <h2 style="font-weight: bold; font-size: 1.2rem; text-align: left;">文章</h2>
            </div>
        </template>
        <template #home-features-after>
            <div class="features-title">
                <h2>分类</h2>
            </div>
        </template>
    </Layout>
</template>

<style>
.features-title {
    display: grid;
    place-items: center;
    margin: 16px;
    
    h2 {
        font-size: 20px;
    }
}
</style>