const discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Ping le bot pour voir s\'il est en ligne.',
    dm: true,
    permission: 'aucune',

    run: async (client, message) => {
        await message.reply('Pong !');
    }
};