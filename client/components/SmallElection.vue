<template>
    <article>
        <header>
            <router-link :to="'/election/' + slug"> {{ name }} </router-link> &nbsp;
            <template v-if="isAuth">
                (<router-link :to="'/edit/' + slug"> ✎ Editer </router-link>) &nbsp;
            </template>
            <election-state :ongoing="ongoing" :broadcasted="broadcasted"></election-state>
        </header>
        <div class="description" v-html="description.html"></div>
    </article>
</template>

<script>
    module.exports = {
        props: ['slug', 'name', 'ongoing', 'broadcasted', 'description', 'isAuth'],
        components: {
            ElectionState: require('./ElectionState.vue')
        }
    };
</script>

<style lang="less" scoped>
    @import "../styles/colors.less";

    a {
        display: inline-block;
        font-size: 1.3em;
        font-weight: bold;
        margin-top: 0.2em;
        margin-bottom: 0.2em;
        transition: opacity 0.3s ease-out;

        &:hover {
            opacity: 0.6;
        }

        &:nth-child(2) {
            color: @header-color;
            font-size: 1em;
            font-weight: normal;
        }
    }

    header {
        border-bottom: 1px double @background;
        padding-left: 40px;
    }

    article {
        background-color: @upper-background;
        border-radius: 10px;
        padding-bottom: 0.5em;
        margin-bottom: 1em;
    }

    div.description {
        padding-left: 40px;
        max-height: 85px;
        overflow: auto;
    }
</style>
