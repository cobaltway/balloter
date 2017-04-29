const keystone = require('keystone'),
    Election = keystone.list('Election'),
    Alternative = keystone.list('Alternative');

module.exports = function({name, description, choices}) {
    return new Promise((resolve, reject) => {
        try {
            choices = JSON.parse(choices);
        }
        catch (e) {
            reject(e);
            return;
        }

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

                resolve(keystone.format(election));
            });
        }).catch(reject);
    });
};
