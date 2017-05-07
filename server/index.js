const keystone = require('keystone'),
    fs = require('fs'),
    path = require('path'),
    config = require('./config');

keystone.init({
    name: 'Balloter',
    static: ['public'],
    'auto update': true,
    session: true,
    'session store': 'mongo',
    auth: true,
    'user model': 'User',
    'cookie secret': config.COOKIE_SECRET,
    mongo: config.MONGO,
    port: 80,
    host: '79.137.36.121',
    'signin redirect': '/',
    'signout redirect': '/'
});

fs.readdirSync(path.join(__dirname, './models')).forEach((m) => {
    require('./models/' + m);
});

fs.readdirSync(path.join(__dirname, './libs/utils')).forEach((u) => {
    keystone[u.replace('.js', '')] = require('./libs/utils/' + u);
});

keystone.set('routes', require('./routes'));

keystone.start();
