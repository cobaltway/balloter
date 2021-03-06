<template>
    <div>
        <page-title :title="name">
            <span style="vertical-align: middle">
                &nbsp; <election-state :ongoing="ongoing" :broadcasted="broadcasted"></election-state>
                &nbsp;
                <router-link :to="'/edit/' + slug" v-if="isAuth">
                    (<span class="color">✎ Editer</span>)
                </router-link>
            </span>
        </page-title>
        <load-or-error :error="error" :loading="loading"></load-or-error>

        <div v-if="name" class="form">
            <p class="main" v-if="description"> {{ description }} </p>

            <div v-if="voters" class="voters">
                <div v-if="alreadyVoted"> Vous avez déjà voté pour cette élection. </div>
                <span class="color"> {{ voters }} </span>
                votant.e<template v-if="voters.length > 1">.s</template>
            </div>

            <h2> Liste des alternatives </h2>

            <div class="choice" v-for="(choice, index) in choices">
                <h5> {{ choice.name }} </h5>
                <span class="result" v-if="!ongoing">
                    <div class="color">
                        {{ choice.rank + 1 }}
                        <sup> {{ cardinal(choice.rank) }} </sup>
                    </div>
                    {{ verbal(choice.note) }}
                </span>
                <p v-if="choice.description"> {{ choice.description }} </p>
                <a v-if="choice.image" class="miniature" target="_blank" :href="choice.image">
                  <img :src="choice.image"/>
                </a>
                <vote-input v-if="voteKey && !alreadyVoted"
                    @input="v => choice.note = v">
                </vote-input>
            </div>

            <div v-if="voteKey && !alreadyVoted" class="actions">
                <span v-if="voted">
                    Votre vote a été pris en compte, merci !
                </span>
                <async-button v-else
                    :disabled="!canVote" value="Voter"
                    :request="vote()" @done="voted = true">
                </async-button>
            </div>
        </div>
    </div>
</template>

<script>
    const shuffle = require('../libs/shuffle.js');

    module.exports = {
        data() {
            return {
                alreadyVoted: false,
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
                return this.choices.filter((c) => c.note !== undefined).length === this.choices.length;
            }
        },
        methods: {
            afterWrite(body) {
                if (body.voted) {
                    this.alreadyVoted = true;
                }
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
        },
        watch: {
            voted(hasVoted, old) {
                if (hasVoted) {
                    window.setTimeout(() => {
                        this.$router.push('/election/' + this.slug);
                    }, 1000);
                }
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

    h2 {
      text-align: center;
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

        a.miniature {
          img {
            max-height: 80px;
            width: auto;
            border-radius: 2px;
          }
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
