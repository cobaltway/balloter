const client = require('./client');

module.exports = ({ guild, channel, role, election, tokens }) => {
  let count = 0;
  const guildObject = client.guilds.get(guild);
  let roleObject;
  if (role) roleObject = guildObject.roles.find('name', role);
  const channelObject = guildObject.channels.get(channel);

  guildObject.members.forEach((m) => {
    const link = `${process.env.URL}/election/${election.slug}/${tokens[count++]}`;

    setTimeout(async () => {
      try {
        await m.send([
          `Voilà ton lien pour le vote \`${election.name}\` sur ${guildObject.name}.`,
          'Pour voter, il te suffit de cliquer et de remplir le formulaire.',
          'Ce lien ne fonctionnera qu\'une seule fois, pour ce vote seulement, et il t\'est personnel, alors veille à ne pas le diffuser.',
          `➡ ${link}`
        ].join('\n'));
      }
      catch (e) {
        console.log('Cannot deliver to', m.user.username);
      }
    }, 100);
  });

  channelObject.send([
    'Une nouvelle élection a été ouverte.',
    `\`\`\`${election.name}\`\`\``,
    roleObject ? `Cette élection est ouverte aux ${roleObject}.` : 'Cette élection est ouverte à tous les membres.',
    'Vous allez recevoir dans les prochaines minutes une clé en message privé pour y participer.'
  ].join('\n'));
};
