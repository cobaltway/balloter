<template>
    <label :class="{ disabled }">
        <button @click="doRequest" :disabled="disabled" class="important">
            {{ value }}
            <div v-if="loading" class="loader">
                😏
            </div>
        </button>
        <div v-else-if="error" class="error">
            ⚠ {{ error.body || error }}
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
