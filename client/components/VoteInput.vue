<template>
    <div>
        ⟶
        <label v-for="(_, i) in values">
            <input type="radio" :name="_uid" @change="$emit('input', i)"/>
            <span> {{ verbal(i) }} </span>
        </label>
        ⟵
    </div>
</template>

<script>
    module.exports = {
        data: function() {
            return {
                values: new Array(7)
            };
        },
        methods: {
            verbal: require('../libs/verbalNote.js')
        }
    };
</script>

<style lang="less" scoped>
    @import "../styles/colors.less";

    b {
        margin-right: 1em;
    }

    label {
        display: inline-block;
        position: relative;
        cursor: pointer;
        transition: all 0.3s ease-out;
        text-align: center;
        margin-left: 0.3em;
        margin-right: 0.3em;
        margin-bottom: 0.5em;

        &:hover span {
            color: @header-color;
        }
    }

    span {
        width: 100%;
        display: inline-block;
        border: 1px solid transparent;
        border-radius: 5px;
        transition: all 0.3s ease-out;
        box-sizing: border-box;
        font-size: 0.9em;
        background-color: rgba(255, 255, 255, .5);
    }

    input[type=radio] {
        visibility: hidden;
        margin: 0;
        width: 0;

        &:checked + span {
            color: @header-color;
            border-color: @header-color;
        }
    }

</style>
