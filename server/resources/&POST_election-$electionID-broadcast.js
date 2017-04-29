const keystone = require('keystone'),
    Election = keystone.list('Election');

module.exports = function({electionID, ongoing}) {
    return new Promise((resolve, reject) => {
        Election.model.findOne({slug: electionID})
        .exec((err, election) => {
            if (err || !election) {
                reject(err || {message: 'No election found with this ID'});
                return;
            }

            // TODO: Call the bot system

            election.broadcasted = true;
            election.save((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    });
};
