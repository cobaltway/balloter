const keystone = require('keystone'),
    Election = keystone.list('Election'),
    request = require('request'),
    generateTokens = require('../libs/utils/generateTokens'),
    config = require('../config.js'),
    code = config.APOLLON_TOKEN,
    basePath = config.BASE_PATH,
    guildID = config.GUILD_ID,
    channelID = config.CHANNEL_ID;

module.exports = function({electionID, ongoing, role = 'test'}) {
    return new Promise((resolve, reject) => {
        Election.model.findOne({slug: electionID})
        .exec((err, election) => {
            if (err || !election) {
                reject(err || {message: 'No election found with this ID'});
                return;
            }

            request.get({
                url: `http://localhost:3000/balloter/${code}/membersCount/${guildID}/${role}`
            }, (err, response, body) => {
                if (err) {
                    reject(err);
                    return;
                }

                const tokens = generateTokens(Number(body) + 5);
                election.activeKeys.push(...tokens);

                request.post({
                    url: `http://localhost:3000/balloter/${code}/broadcast/${guildID}/${channelID}/${role}`,
                    form: {
                        basePath,
                        name: election.name,
                        slug: election.slug,
                        tokens: JSON.stringify(tokens)
                    }
                }, (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    election.broadcasted = true;
                    resolve();

                    election.save((err) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve();
                    });
                });
            });
        });
    });
};
