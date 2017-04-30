import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

module.exports = function(route) {
    const router = new VueRouter({
        // mode: 'history',
        routes: [
            {
                path: '/',
                component: require('./pages/FrontPage.vue')
            },
            {
                path: '/create',
                component: require('./pages/AdminElection.vue'),
                props: { creation: true }
            },
            {
                path: '/edit/:slug',
                component: require('./pages/AdminElection.vue'),
                props: true
            },
            {
                path: '/election/:slug',
                component: require('./pages/ViewElection.vue'),
                props: true
            }
        ]
    });

    if (route) {
        router.push(route);
    }

    return router;
};
