<template>
    <div>
        <div v-if="loading">
            Loading...
        </div>
        <div v-else-if="error">
            {{ error }}
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ['error', 'loading']
    };
</script>
