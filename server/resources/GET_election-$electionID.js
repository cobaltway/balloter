const keystone = require('keystone'),
    Election = keystone.list('Election');

module.exports = function({electionID}) {
    return new Promise((resolve, reject) => {
        Election.model.findOne({slug: electionID})
        .populate('choices')
        .exec((err, election) => {
            if (err || !election) {
                reject(err || {message: 'No election found with this ID'});
                return;
            }

            resolve(keystone.format(election, {
                choices: election.choices.map((a) => {
                    return keystone.format(a, {
                        note: election.ongoing ? undefined : a.note,
                        rank: election.ongoing ? undefined : a.rank
                    });
                }),
                voters: election.consumedKeys.length
            }));
        });
    });
};
