const keystone = require('keystone');
const Election = keystone.list('Election');

module.exports = function () {
  return new Promise((resolve, reject) => {
    Election.model.find()
        .exec((err, elections) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(elections.map(e => keystone.format(e, { choices: undefined })));
        });
  });
};
