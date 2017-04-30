<template>
    <h1 v-if="title">
        {{ title }}
        <slot></slot>
    </h1>
</template>

<script>
    module.exports = {
        props: ['title']
    };
</script>

<style lang="less" scoped>
    h1 {
        left: 0;
        position: absolute;
        box-sizing: border-box;
        width: 100%;
        padding-top: 0.3em;
        padding-bottom: 0.3em;
        margin-bottom: 1.5em;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        border-top: 1px solid rgba(0, 0, 0, 0.2);
        text-align: center;

        span {
            font-size: 0.6em;
            font-weight: normal;
        }
    }
</style>
