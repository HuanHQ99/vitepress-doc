<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
</script>
<template>
    <Layout>
        <template #home-features-before>
            <div class="features-title">
                <h2 class="title"><span class="text">文章</span><span class="icon">📖</span></h2>
            </div>
        </template>
        <template #home-features-after>
            <div class="features-title">
                <h2></h2>
            </div>
        </template>
    </Layout>
</template>
<style scoped>
.features-title {
    display: grid;
    place-items: center;
    margin: 16px;
}
.features-title .title {
    justify-self: start; /* 让 h2 靠左对齐 */
    margin-left: 0vw; /* 使用 vw 单位动态调整 */
    font-size: 2rem; /* 增大字体 */
    font-weight: 600; /* 加粗字体 */
    color: #2c3e50; /* 深灰色文字 */
    position: relative; /* 为图标动画做准备 */
}
/* 文字边框效果 */
.features-title .text {
    display: inline-block; /* 确保边框只包裹文字 */
    padding: 8px 16px; /* 增加内边距 */
    border-radius: 8px; /* 圆角边框 */
    border: 2px solid #e1e1e1; /* 边框颜色和宽度 */
    background: linear-gradient(90deg, #f9f9f9, #ffffff); /* 渐变背景 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}
/* 图标美化 */
.features-title .icon {
    display: inline-block;
    margin-left: 8px;
    font-size: 1.2em;
    animation: float 2s ease-in-out infinite; /* 图标浮动动画 */
}
/* 图标浮动动画 */
@keyframes float {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-5px);
    }
}
/* 鼠标悬停效果 */
.features-title .title:hover .text {
    color: #42b983; /* 鼠标悬停时文字变色 */
    transform: scale(1.05); /* 轻微放大 */
    transition: all 0.3s ease;
}
</style>
