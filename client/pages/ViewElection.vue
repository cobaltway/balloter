<template>
    <div>
        <page-title :title="name">
            <span>
                <router-link :to="'/edit/' + slug"> (Editer) </router-link>
                <election-state :ongoing="ongoing" :broadcasted="broadcasted"></election-state>
            </span>
        </page-title>
        <load-or-error :error="error" :loading="loading"></load-or-error>

        <div class="form">
            <p> {{ description }} </p>

            <h3> Choix </h3>
            <div class="choices">
                <div v-for="(choice, index) in choices">
                    <h5> {{ choice.name }} </h5>
                    <p> {{ choice.description }} </p>
                </div>
            </div>

            <async-button
                :disabled="!canVote" value="Voter"
                :request="vote()" @done="voted">
            </async-button>
        </div>
    </div>
</template>

<script>
    module.exports = {
        mixins: [require('../mixins/election.js')],
        components: {
            PageTitle: require('../components/PageTitle.vue'),
            AsyncButton: require('../components/AsyncButton.vue'),
            LoadOrError: require('../components/LoadOrError.vue'),
            ElectionState: require('../components/ElectionState.vue')
        },
        computed: {
            canVote() {

            }
        },
        methods: {
            vote() {

            },
            voted() {

            }
        }
    };
</script>

<style lang="less" scoped>

</style>
