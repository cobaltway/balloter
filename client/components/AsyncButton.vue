<template>
    <label :class="{ disabled }">
        <input type="button"
            @click="doRequest"
            :disabled="disabled"
            :value="value"
            class="important"/>
        <div v-if="loading">
            Loading...
        </div>
        <div v-else-if="error">
            {{ error }}
        </div>
    </label>
</template>

<script>
    module.exports = {
        props: ['value', 'request', 'disabled'],
        data: function() {
            return {
                loading: null,
                error: null
            };
        },
        methods: {
            doRequest() {
                this.loading = true;
                this.request().then((data) => {
                    this.$emit('done', data);
                }).catch((err) => {
                    console.log(err);
                    this.error = err;
                }).then(() => {
                    this.loading = false;
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    .disabled {
        color: red;
    }
</style>
