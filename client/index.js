import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const app = new Vue({
    render(createElement) {
        return createElement('div', {domProps: {id: '#app'}}, [
            createElement('main-header'),
            createElement('main-content', [
                createElement('router-view')
            ])
        ]);
    },
    components: {
        MainHeader: require('./header/MainHeader.vue'),
        MainContent: require('./content/MainContent.vue')
    },
    router: require('./routes')()
});

app.$mount('#app');
