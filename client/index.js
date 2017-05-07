import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const app = function({url, isAuth} = {}) {
    const router = require('./routes')(isAuth);
    const vue = new Vue({
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

    return new Promise((resolve, reject) => {
        if (url) {
            router.push(url);
        }
        router.onReady(() => {
            resolve(vue);
        }, reject);
    }).catch(console.log);
};

if (typeof window !== 'undefined') {
    app({isAuth: window._AUTH}).then(vue => vue.$mount('#app'));
}

module.exports = app;
