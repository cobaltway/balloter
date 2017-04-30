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
                choices: election.choices.map((c) => {
                    return keystone.format(c, {
                        note: election.ongoing ? undefined : c.note,
                        rank: election.ongoing ? undefined : c.rank
                    });
                }),
                voters: election.consumedKeys.length
            }));
        });
    });
};
