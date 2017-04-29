const keystone = require('keystone'),
    Election = keystone.list('Election');

module.exports = function({electionID}) {
    return new Promise((resolve, reject) => {
        Election.model.findOne({slug: electionID})
        .populate('choices')
        .populate('votes')
        .exec((err, election) => {
            if (err || !election) {
                reject(err || {message: 'No election found with this ID'});
                return;
            }

            Promise.all(election.choices.map((c) => {
                return new Promise((resolve, reject) => {
                    c.remove((err) => {
                        if (err) {
                            reject();
                            return;
                        }

                        resolve();
                    });
                });
            })).then(() => {
                Promise.all(election.votes.map((v) => {
                    return new Promise((resolve, reject) => {
                        v.remove((err) => {
                            if (err) {
                                reject();
                                return;
                            }

                            resolve();
                        });
                    });
                })).then(() => {
                    election.remove((err) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        resolve();
                    });
                }).catch(reject);
            }).catch(reject);
        });
    });
};
