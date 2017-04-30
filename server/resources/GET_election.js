const keystone = require('keystone'),
    Election = keystone.list('Election');

module.exports = function() {
    return new Promise((resolve, reject) => {
        Election.model.find()
        .exec((err, elections) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(elections.map((e) => {
                return keystone.format(e, {
                    choices: undefined
                });
            }));
        });
    });
};
