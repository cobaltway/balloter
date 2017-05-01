import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const router = require('./routes');
const app = new Vue({
    render(createElement) {
        return createElement('div', {domProps: {id: 'app'}}, [
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
    router
});

if (typeof window !== 'undefined') {
    app.$mount('#app');
}

module.exports = ({url}) => {
    return new Promise((resolve, reject) => {
        router.push(url);
        router.onReady(() => {
            resolve(app);
        }, reject);
    }).catch((e) => {
        console.log(e);
    });
};
