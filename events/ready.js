const discord = require('discord.js');
const loadSlashCommands = require('../loaders/loadSlashCommands');
const loadDatabase      = require('../loaders/loadDatabase');

module.exports = async client => {

    client.db = await loadDatabase();

    await loadSlashCommands(client);
    console.log(`${client.user.tag} est en ligne !`);
}