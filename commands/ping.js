const discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Ping !',
    dm: false,
    permission: 'aucune',

    run: async (client, message) => {
        await message.reply('Pong !');
    }
};