const keystone = require('keystone');
const User = keystone.list('User');

exports = module.exports = function (done) {
  new User.model({
    name: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    canAccessKeystone: true
  }).save(done);
};
