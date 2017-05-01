module.exports = {
    created() {
        this.fetch();
    },
    watch: {
        '$route': 'fetch'
    },
    methods: {
        fetch() {
            if (typeof window !== 'undefined') {
                this.fetchFunc();
            }
        }
    }
};
