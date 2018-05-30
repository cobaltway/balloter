const client = require('./client');
const events = require('./events');

module.exports = async () => {
  try {
    await client.login(process.env.DISCORD_TOKEN);
    console.log('DISCORD BOT ONLINE');
    events(); // Links event handlers
  }
  catch (e) {
    console.error('DISCORD BOT FAILED TO CONNECT', e);
  }
};
