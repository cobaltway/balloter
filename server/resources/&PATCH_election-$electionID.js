const keystone = require('keystone');
const Election = keystone.list('Election');
const judgment = require('majority-judgment');

module.exports = function ({ electionID, ongoing }) {
  return new Promise((resolve, reject) => {
    Election.model.findOne({ slug: electionID })
        .populate('votes')
        .populate('choices')
        .exec((err, election) => {
          if (err || !election) {
            reject(err || { message: 'No election found with this ID' });
            return;
          }

          election.ongoing = !!ongoing;

          const alternatives = new Map();
          election.votes.forEach((v) => {
            const key = String(v.alternative);
            if (!alternatives.has(key)) {
              alternatives.set(key, {
                id: key,
                votes: []
              });
            }
            alternatives.get(key).votes.push(v.note);
          });

          const sortedAlternatives = judgment(Array.from(alternatives.values()));

          Promise.all(election.choices.map(choice => new Promise((resolve, reject) => {
            sortedAlternatives.some((alternative) => {
              if (choice._id.equals(alternative.id)) {
                choice.note = alternative.note;
                choice.rank = alternative.rank;
                return true;
              }
              return false;
            });

            choice.save((err) => {
              if (err) {
                reject(err);
                return;
              }
              resolve();
            });
          }))).then(() => {
            election.save((err) => {
              if (err) {
                reject(err);
                return;
              }
              resolve();
            });
          }).catch(reject);
        });
  });
};
