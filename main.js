require('dotenv').config();

const discord      = require('discord.js');
const intents      = new discord.IntentsBitField(3276799);
const client       = new discord.Client({ intents });
const token        = process.env.DISCORD_TOKEN;
const loadCommands = require('./loaders/loadCommands');
const loadEvents   = require('./loaders/loadEvents');

client.commands = new discord.Collection();

client.function = {
  createId: require('./fonctions/createId'),
  ensureUser: require('./fonctions/ensureUser')
}

client.login(token);
loadCommands(client);
loadEvents(client);