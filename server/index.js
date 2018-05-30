require('dotenv').config();
const keystone = require('keystone');
const fs = require('fs');
const path = require('path');
require('./discord/login')();

keystone.init({
  name: 'Balloter',
  static: ['public'],
  'auto update': true,
  session: true,
  'session store': 'mongo',
  auth: true,
  'user model': 'User',
  'cookie secret': process.env.COOKIE_SECRET,
  mongo: process.env.MONGO,
  port: process.env.PORT,
  host: process.env.HOST,
  'signin redirect': '/',
  'signout redirect': '/'
});

fs.readdirSync(path.join(__dirname, './models')).forEach((m) => {
  require(`./models/${m}`);
});

fs.readdirSync(path.join(__dirname, './libs/utils')).forEach((u) => {
  keystone[u.replace('.js', '')] = require(`./libs/utils/${u}`);
});

keystone.set('routes', require('./routes'));

keystone.start();
