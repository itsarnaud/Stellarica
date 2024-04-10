const discord = require('discord.js');
const loadSlashCommands = require('../loaders/loadSlashCommands');

module.exports = async client => {
    await loadSlashCommands(client);
    console.log(`${client.user.tag} est en ligne !`);
}