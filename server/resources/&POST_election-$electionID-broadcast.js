const keystone = require('keystone');
const Election = keystone.list('Election');
const getMemberCount = require('../discord/getMemberCount');
const broadcast = require('../discord/broadcast');
const generateTokens = require('../libs/utils/generateTokens');

module.exports = function ({ electionID, role }) {
  return new Promise((resolve, reject) => {
    Election.model.findOne({ slug: electionID })
      .exec(async (err, election) => {
        if (err || !election) {
          reject(err || { message: 'No election found with this ID' });
          return;
        }

        const memberCount = await getMemberCount({
          guild: process.env.GUILD_ID,
          role
        });

        const tokens = generateTokens(memberCount + 5); // Generate 5 more for safety
        election.activeKeys.push(...tokens);

        await broadcast({
          guild: process.env.GUILD_ID,
          channel: process.env.CHANNEL_ID,
          role,
          election,
          tokens
        });

        election.broadcasted = true;

        election.save((err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });
      });
  });
};
