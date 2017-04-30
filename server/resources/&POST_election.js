const keystone = require('keystone'),
    Election = keystone.list('Election'),
    Alternative = keystone.list('Alternative');

module.exports = function({name, description, choices}) {
    return new Promise((resolve, reject) => {
        const election = new Election.model({
            name: name,
            description: {md: description}
        });

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

                election.populate('choices', (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(keystone.format(election, {
                        choices: election.choices.map((c) => {
                            return keystone.format(c, {
                                note: undefined,
                                rank: undefined
                            });
                        })
                    }));
                });
            });
        }).catch(reject);
    });
};
