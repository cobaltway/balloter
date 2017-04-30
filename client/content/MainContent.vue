<template>
    <section>
        <slot></slot>
    </section>
</template>

<style lang="less">
    @import "../styles/common.less";
    @import "../styles/inputs.less";

    section {
        position: fixed;
        top: 120px;
        left: 0;
        height: ~"calc(100vh - 120px)";
        width: 100vw;
        overflow: auto;
        box-sizing: border-box;
    }
</style>
