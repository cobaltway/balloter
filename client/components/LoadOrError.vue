<template>
    <div class="l-e-container">
        <div v-if="loading" class="loader big"> 😏 </div>
        <div v-else-if="error" class="error">
            {{ error.body || error }}
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ['error', 'loading']
    };
</script>

<style lang="less" scoped>
    .l-e-container {
        text-align: center;
        padding-top: 100px;
    }
</style>
