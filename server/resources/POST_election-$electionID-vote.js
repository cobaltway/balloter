const keystone = require('keystone'),
    Election = keystone.list('Election'),
    Vote = keystone.list('Vote');

const checkCorrectness = function({key, choices, election}) {
    return new Promise((resolve, reject) => {
        if (!election.ongoing) {
            reject({message: 'This election was closed'});
        }

        if (!election.broadcasted) {
            reject({message: 'This election is not broadcasted yet'});
        }

        if (election.activeKeys.indexOf(key) === -1) {
            reject({
                message: election.consumedKeys.indexOf(key) === -1 ? 'Wrong key' : 'Already used key'
            });
        }

        if (choices.length !== election.choices.length) {
            reject({message: 'Wrong number of choices'});
        }

        const alternatives = {};
        choices.forEach((c) => {
            if (!election.choices.some(eChoices => eChoices.equals(c.id))) {
                reject({message: 'Some choices are not in the list'});
            }

            const note = parseInt(c.note);
            if (!Number.isFinite(note) || note < 0 || note > 6) {
                reject({message: 'Some note values are wrong'});
            }

            if (alternatives[c.id]) {
                reject({message: 'Some votes are duplicated'});
            }
            alternatives[c.id] = true;
        });

        resolve();
    });
};

const createVotes = function({key, choices}) {
    const votes = [];
    return Promise.all(choices.map((c) => {
        return new Promise((resolve, reject) => {
            const newVote = new Vote.model({
                alternative: c.id,
                note: c.note,
                key
            });
            newVote.save((err) => {
                if (err) {
                    reject(err);
                    return;
                }

                votes.push(newVote._id);
                resolve();
            });
        });
    })).then(() => votes);
};

module.exports = function({electionID, key, choices}) {
    return new Promise((resolve, reject) => {
        Election.model.findOne({slug: electionID})
        .exec((err, election) => {
            if (err || !election) {
                reject(err || {message: 'No election found with this ID'});
                return;
            }

            checkCorrectness({key, choices, election}).then(() => {
                createVotes({key, choices}).then((votes) => {
                    election.votes = [...votes, ...election.votes];
                    election.consumedKeys.push(key);
                    election.activeKeys = election.activeKeys.filter((k) => {
                        return k !== key;
                    });
                    election.save((err) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        resolve();
                    });
                }).catch(reject);
            }).catch(reject);
        }).catch(reject);
    });
};
