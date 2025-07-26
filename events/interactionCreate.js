const discord = require('discord.js');
const ensureUser = require('../fonctions/ensureUser');

module.exports = async (client, interaction) => {
  if (interaction.type === discord.InteractionType.ApplicationCommand) {
    await ensureUser(client.db, interaction.user, interaction.member);
    let cmd = require(`../commands/${interaction.commandName}`);
    cmd.run(client, interaction, interaction.options, client.db);
  }
};