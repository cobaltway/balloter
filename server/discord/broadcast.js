const client = require('./client');

module.exports = ({ guild, channel, role, election, tokens }) => {
  let count = 0;
  const guildObject = client.guilds.get(guild);
  const roleObject = guildObject.roles.find('name', role);
  const channelObject = guildObject.channels.get(channel);

  guildObject.members.forEach((m) => {
    const link = `${process.env.URL}/election/${election.slug}/${tokens[count++]}`;

    setTimeout(() => {
      m.sendMessage([
        `Voilà ton lien pour le vote \`${election.name}\` sur ${guildObject.name}.`,
        'Pour voter, il te suffit de cliquer et de remplir le formulaire.',
        'Ce lien ne fonctionnera qu\'une seule fois, pour ce vote seulement, et il t\'est personnel, alors veille à ne pas le diffuser.',
        `➡ ${link}`
      ].join('\n'));
    }, 100);
  });

  channelObject.sendMessage(`
    Une nouvelle élection a été ouverte.\n
    \`\`\`${election.name}\`\`\`\n
    Cette élection est ouverte aux ${roleObject}.\n
    Vous allez recevoir dans les prochaines minutes une clé en message privé pour y participer.
  `);
};
