<template>
    <router-link to="/">
        <img src="assets/rr_logo.png" alt="Résistance et Révolution"/>
        <h1>
            — Espace de vote par jugement majoritaire 😏 —
        </h1>
    </router-link>
</template>

<style lang="less" scoped>
    @import "../styles/colors.less";
    a {
        padding-left: 20px;
    }
    img {
        vertical-align: middle;
        height: 100px;
        display: inline-block;
    }
    h1 {
        color: @background;
        display: inline-block;
        font-size: 1em;
        margin-left: 3em;
        font-weight: normal;
    }
</style>
