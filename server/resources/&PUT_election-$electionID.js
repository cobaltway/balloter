const keystone = require('keystone');
const Election = keystone.list('Election');
const Alternative = keystone.list('Alternative');

module.exports = function ({ electionID, name, description, choices }) {
  return new Promise((resolve, reject) => {
    Election.model.findOne({ slug: electionID })
        .populate('choices')
        .exec((err, election) => {
          if (err || !election) {
            reject(err || new Error('No election found with this ID'));
            return;
          }

          if (election.broadcasted) {
            reject(new Error('You cannot modify a broadcasted election'));
            return;
          }

          election.name = name;
          election.description.md = description;
          Promise.all(election.choices.map(c => new Promise((resolve, reject) => {
            c.remove((err) => {
              if (err) {
                reject(err);
                return;
              }

              resolve();
            });
          }))).then(() => {
            election.choices = [];

            Promise.all(choices.map(c => new Promise((resolve, reject) => {
              const newAlternative = new Alternative.model({
                name: c.name,
                description: { md: c.description },
                image: c.image
              });
              newAlternative.save((err) => {
                if (err) {
                  reject(err);
                  return;
                }

                election.choices.push(newAlternative._id);
                resolve();
              });
            }))).then(() => {
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
                    choices: election.choices.map(c => keystone.format(c, {
                      note: undefined,
                      rank: undefined
                    }))
                  }));
                });
              });
            }).catch(reject);
          }).catch(reject);
        });
  });
};
