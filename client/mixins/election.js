module.exports = {
    props: ['slug'],
    mixins: [require('./fetch.js')],
    data: function() {
        return {
            name: '',
            description: '',
            choices: [],
            error: null,
            loading: true,
            changed: false,
            ongoing: true,
            broadcasted: false
        };
    },
    methods: {
        fetchFunc() {
            if (this.slug) {
                this.loading = true;
                this.$http.get('/api/election/' + this.slug)
                .then(this.writeUp)
                .catch((err) => {
                    this.error = err;
                }).then(() => {
                    this.loading = false;
                });
            }
        },
        writeUp({body}) {
            if (body.slug) {
                this.name = body.name;
                this.description = body.description.md;
                this.choices = body.choices.map((c) => {
                    return {
                        id: c._id,
                        name: c.name,
                        description: c.description.md,
                        note: c.note,
                        rank: c.rank
                    };
                });
                this.ongoing = body.ongoing;
                this.broadcasted = body.broadcasted;
            }
            if (this.afterWrite) {
                this.afterWrite(body);
            }
        }
    }
};
