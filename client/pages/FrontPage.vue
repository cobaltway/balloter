<template>
    <div>
        <div class="new-election">
            <router-link to="/create">
                ✚ Nouvelle élection
            </router-link>
        </div>

        <page-title title="Liste des élections">
            <span>
                <input type="checkbox" v-model="terminated" />
                Terminées
                <input type="checkbox" v-model="ongoing" />
                En cours
                <input type="checkbox" v-model="notBroadcasted" />
                Pas encore ouvertes
            </span>
        </page-title>

        <load-or-error :error="error" :loading="loading"></load-or-error>

        <div class="elections" v-if="elections">
            <small-election
                v-for="election in elections"
                v-if="shouldDisplay(election)"
                v-bind="election">
            </small-election>
        </div>
    </div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            loading: true,
            elections: null,
            error: null,
            terminated: true,
            ongoing: true,
            notBroadcasted: true
        };
    },
    mixins: [require('../mixins/fetch.js')],
    methods: {
        fetchFunc() {
            this.loading = true;
            this.$http.get('/api/election/').then(({body}) => {
                this.elections = body;
            }).catch((err) => {
                this.error = err;
            }).then(() => {
                this.loading = false;
            });
        },
        shouldDisplay(election) {
            return !((!election.broadcasted && !this.notBroadcasted) ||
            (election.ongoing && !this.ongoing) ||
            (!election.ongoing && !this.terminated)) ||
            !election.broadcasted && this.notBroadcasted;
        }
    },
    components: {
        PageTitle: require('../components/PageTitle.vue'),
        SmallElection: require('../components/SmallElection.vue'),
        LoadOrError: require('../components/LoadOrError.vue')
    }
};
</script>

<style lang="less" scoped>
    @import "../styles/colors.less";

    div.new-election {
        text-align: center;
        margin-bottom: 2.5em;

        a {
            padding: 0.3em 0.5em;
            display: inline-block;
            background-color: @header-color;
            border: 3px double @background;
            font-size: 1.5em;
            border-radius: 10px;
            transition: box-shadow 0.3s ease-out;

            &:hover {
                box-shadow: inset 0 0 200px 200px rgba(0, 0, 0, 0.2);
            }
        }
    }

    .elections {
        padding-left: 20px;
        padding-right: 20px;
    }
</style>
