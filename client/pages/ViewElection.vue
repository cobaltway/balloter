<template>
    <div>
        <page-title :title="name">
            <span style="vertical-align: middle">
                &nbsp; <election-state :ongoing="ongoing" :broadcasted="broadcasted"></election-state>
                &nbsp;
                <router-link :to="'/edit/' + slug">
                    (<span class="color">✎ Editer</span>)
                </router-link>
            </span>
        </page-title>
        <load-or-error :error="error" :loading="loading"></load-or-error>

        <div v-if="name" class="form">
            <p class="main"> {{ description }} </p>

            <div v-if="voters" class="voters">
                <span class="color"> {{ voters }} </span> votant.e.s
            </div>

            <div class="choice" v-for="(choice, index) in choices">
                <h5> {{ choice.name }} </h5>
                <span class="result" v-if="!ongoing">
                    <div class="color">
                        {{ choice.rank + 1 }}
                        <sup> {{ cardinal(choice.rank) }} </sup>
                    </div>
                    {{ verbal(choice.note) }}
                </span>
                <vote-input v-if="voteKey" v-model="choice.note"></vote-input>
                <p v-if="choice.description"> {{ choice.description }} </p>
            </div>

            <div v-if="voteKey" class="actions">
                <span v-if="voted">
                    Votre vote a été pris en compte, merci !
                </span>
                <async-button v-else
                    :disabled="!canVote" value="Voter"
                    :request="vote()" @done="this.voted = true">
                </async-button>
            </div>
        </div>
    </div>
</template>

<script>
    const shuffle = require('../libs/shuffle.js');

    module.exports = {
        props: ['voteKey'],
        data() {
            return {
                voted: false,
                voters: null
            };
        },
        mixins: [require('../mixins/election.js')],
        components: {
            PageTitle: require('../components/PageTitle.vue'),
            AsyncButton: require('../components/AsyncButton.vue'),
            LoadOrError: require('../components/LoadOrError.vue'),
            ElectionState: require('../components/ElectionState.vue'),
            VoteInput: require('../components/VoteInput.vue')
        },
        computed: {
            canVote() {
                return this.choices.filter((c) => c.note !== null).length === this.choices.length;
            }
        },
        methods: {
            afterWrite(body) {
                this.voters = body.voters;
                if (this.ongoing) {
                    this.choices = shuffle(this.choices);
                }
                else {
                    this.choices = this.choices.sort((c1, c2) => c1.rank - c2.rank);
                }
            },
            vote() {
                return () => this.$http.post('/api/election/' + this.slug + '/vote', {
                    key: this.voteKey,
                    choices: this.choices.map((c) => {
                        return {
                            id: c.id,
                            note: c.note
                        };
                    })
                });
            },
            verbal: require('../libs/verbalNote.js'),
            cardinal(position) {
                if (position === 0) {
                    return 'er';
                }
                return 'ème';
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../styles/colors.less";

    p {
        background-color: @upper-background;
        border: 3px double @background;
        border-radius: 10px;
        min-height: 120px;
        padding: 1em;
        box-sizing: border-box;
        min-width: 500px;
    }

    .voters {
        text-align: center;
        font-size: 1.2em;
        border-bottom: 1px dashed rgba(0, 0, 0, 0.2);
        padding-bottom: 1em;
        margin-bottom: 1em;
    }

    .choice {
        text-align: center;
        padding-bottom: 1em;
        margin-bottom: 1em;
        border-bottom: 1px dashed rgba(0, 0, 0, 0.2);

        h5 {
            font-size: 1.2em;
            margin-top: 0.1em;
            margin-bottom: 0.1em;
        }

        p {
            min-height: 60px;
        }

        span {
            font-size: 1.2em;

            &.result {
                font-size: 1.1em;
                line-height: 0.8;

                sup {
                    font-size: 0.7em;
                    margin-left: -2px;
                }
            }
        }
    }

    .actions {
        text-align: center;
    }
</style>
