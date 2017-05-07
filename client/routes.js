import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

module.exports = (isAuth) => {
    return new VueRouter({
        mode: 'history',
        routes: [
            {
                path: '/',
                component: require('./pages/FrontPage.vue'),
                props: { isAuth }
            },
            {
                path: '/create',
                component: require('./pages/AdminElection.vue'),
                props: (route) => {
                    return Object.assign({}, route.params, { isAuth, creation: true });
                }
            },
            {
                path: '/edit/:slug',
                component: require('./pages/AdminElection.vue'),
                props: (route) => {
                    return Object.assign({}, route.params, { isAuth });
                }
            },
            {
                path: '/election/:slug/:voteKey?',
                component: require('./pages/ViewElection.vue'),
                props: (route) => {
                    return Object.assign({}, route.params, { isAuth });
                }
            }
        ]
    });
};
