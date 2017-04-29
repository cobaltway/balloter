const keystone = require('keystone'),
    Election = keystone.list('Election'),
    Alternative = keystone.list('Alternative');

module.exports = function({electionID, name, description, choices}) {
    return new Promise((resolve, reject) => {
        try {
            choices = JSON.parse(choices);
        }
        catch (e) {
            reject(e);
            return;
        }

        Election.model.findOne({slug: electionID})
        .populate('choices')
        .exec((err, election) => {
            if (err || !election) {
                reject(err || {message: 'No election found with this ID'});
                return;
            }

            if (election.broadcasted) {
                reject({message: 'You cannot modify a broadcasted election'});
                return;
            }

            election.name = name;
            election.description.md = description;
            Promise.all(election.choices.map((c) => {
                return new Promise((resolve, reject) => {
                    c.remove((err) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        resolve();
                    });
                });
            })).then(() => {
                election.choices = [];

                Promise.all(choices.map((c) => {
                    return new Promise((resolve, reject) => {
                        const newAlternative = new Alternative.model({
                            name: c.name,
                            description: {md: c.description}
                        });
                        newAlternative.save((err) => {
                            if (err) {
                                reject(err);
                                return;
                            }

                            election.choices.push(newAlternative._id);
                            resolve();
                        });
                    });
                })).then(() => {
                    election.save((err) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        resolve(keystone.format(election));
                    });
                }).catch(reject);
            }).catch(reject);
        });
    });
};
