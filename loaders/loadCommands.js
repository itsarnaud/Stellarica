const fs = require('fs');

module.exports = async client => {
    fs.readdirSync('./commands').filter(file => file.endsWith('.js')).forEach(async file => {
        let command = require(`../commands/${file}`);
        if (!command.name || typeof command.name !== 'string') throw new TypeError(`La commande ${command.name} n'a pas de nom !`);
        client.commands.set(command.name, command);
        console.log(`Commande chargée : ${command.name}`)
    })
};