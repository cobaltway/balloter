const client = require('./client');

module.exports = ({ guild, role }) => {
  let count = 0;
  client.guilds.get(guild).members.forEach((m) => {
    if (!role || m.roles.find('name', role)) count++;
  });
  return count;
};
