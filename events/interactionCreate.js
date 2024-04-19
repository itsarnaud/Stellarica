const discord = require('discord.js');

module.exports = async (client, interaction) => {
  if (interaction.type === discord.InteractionType.ApplicationCommand) {
    let cmd = require(`../commands/${interaction.commandName}`);
    cmd.run(client, interaction, interaction.options, client.db);
  }
};