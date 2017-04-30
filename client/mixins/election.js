module.exports = {
    props: ['slug'],
    data: function() {
        return {
            name: '',
            description: '',
            choices: [],
            error: null,
            loading: null,
            changed: false,
            ongoing: true,
            broadcasted: false
        };
    },
    created() {
        this.fetch();
    },
    watch: {
        '$route': 'fetch'
    },
    methods: {
        fetch() {
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
            if (this.slug !== body.slug) {
                this.$router.push('/edit/' + body.slug);
            }
            else {
                this.slug = body.slug;
                this.name = body.name;
                this.description = body.description.md;
                this.choices = body.choices.map((c) => {
                    return {
                        name: c.name,
                        description: c.description.md
                    };
                });
                this.ongoing = body.ongoing;
                this.broadcasted = body.broadcasted;
                this.changed = false;
            }
        }
    }
};
