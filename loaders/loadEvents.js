const fs = require('fs');

module.exports = async client => {
    fs.readdirSync('./events').filter(file => file.endsWith('.js')).forEach(async file => {
        let event = require(`../events/${file}`);
        client.on(file.split(".js").join(""), event.bind(null, client));
        console.log(`Event chargé : ${file.split(".js").join("")}`)
    })
};