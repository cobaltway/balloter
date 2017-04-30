<template>
    <header>
        <logo></logo>
        <top-menu></top-menu>
    </header>
</template>

<script>
    module.exports = {
        components: {
            Logo: require('./Logo.vue'),
            TopMenu: require('./TopMenu.vue')
        }
    };
</script>

<style lang="less" scoped>
    @import "../styles/colors.less";

    header {
        position: fixed;
        background-color: @header-color;
        width: 100%;
        height: 63px;
        margin-top: 7px;
        border-top: 3px double @background;
        border-bottom: 3px double @background;
        text-align: center;
    }
</style>
