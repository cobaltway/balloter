<template>
    <span v-if="!broadcasted" class="not-broadcasted"> Pas encore ouverte </span>
    <span v-else-if="ongoing" class="ongoing"> En cours </span>
    <span v-else class="terminated"> Terminée </span>
</template>

<script>
    module.exports = {
        props: ['ongoing', 'broadcasted']
    };
</script>

<style lang="less" scoped>
    @import "../styles/colors.less";

    span {
        padding: 0.1em 0.4em;
        border-radius: 5px;
        box-sizing: border-box;
    }

    span.not-broadcasted {
        border: 1px dashed @not-broadcasted;
    }

    span.ongoing {
        background-color: @ongoing;
    }

    span.terminated {
        background-color: @terminated;
    }
</style>
