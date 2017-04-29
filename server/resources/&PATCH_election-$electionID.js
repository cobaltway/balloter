const keystone = require('keystone'),
    Election = keystone.list('Election');

module.exports = function({electionID, ongoing}) {
    return new Promise((resolve, reject) => {
        try {
            ongoing = JSON.parse(ongoing);
        }
        catch (e) {
            reject(e);
            return;
        }

        Election.model.findOne({slug: electionID})
        .exec((err, election) => {
            if (err || !election) {
                reject(err || {message: 'No election found with this ID'});
                return;
            }

            election.ongoing = !!ongoing;

            // TODO: calculate note and rating of choices

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
