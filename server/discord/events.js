const client = require('./client');

module.exports = () => {
  client.on('disconnect', async () => {
    console.error('Client disconnected; killing thread');

    await client.destroy();
    process.exit(1); // Kill the thread (forever should restart it)
  });
};
