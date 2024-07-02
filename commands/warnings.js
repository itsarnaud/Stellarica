const discord = require('discord.js');

module.exports = {
  name: 'warnings',
  description: 'Voir la liste des membres ayant reçu un avertissement',
  permission: 'aucune',
  dm: false,
  options: [{
    type: 'user',
    name: 'membre',
    description: 'Voir les warns d\'un membre',
    required: false
  }],

  async run (client, message, args, db) {

    let userArg = args.get('membre');

    await message.deferReply();

    if (userArg) {
      let user = await client.users.fetch(userArg.value);
      if (!user) return message.editReply('Je n\'ai pas trouvé ce membre...');

      let member = message.guild.members.cache.get(user.id);
      if (!member) return message.editReply('Ce membre n\'est pas dans ce serveur...');

      db.query(`SELECT * FROM warns WHERE userID = ?`, [member.user.id], async (err, res) => {
        if (err) {
          return message.editReply('Erreur lors de l\'exécution de la requête SQL :' + err);
        }

        if (res.length === 0) {
          return message.editReply('Ce membre n\'a pas reçu d\'avertissement.');
        }

        let warnings = '';
        let i = 0;
        for (warn of res) { 
          i++
          const user = await client.users.fetch(warn.userID);
          warnings += `Avertissement \`${warn.warnID}\` de **${user.username}** : **${warn.reason}**\n`;
        }

        return message.editReply(warnings);

      })
    }

    else {

      db.query('SELECT * FROM warns', async (err, res) => {
        if (err) {
          return message.editReply('Erreur lors de l\'exécution de la requête SQL :', err);
        }
    
        if (res.length === 0) {
          return message.editReply('Aucun membre n\'a reçu d\'avertissement.');
        }

        let warningCounts = {};
        for (const warn of res) {
          const user = await client.users.fetch(warn.userID);
          if (warningCounts[user.username]) {
            warningCounts[user.username]++;
          } else {
            warningCounts[user.username] = 1;
          }
        }

        let warnings = Object.entries(warningCounts).map(([username, count]) => {
          return `**${username}** compte **${count}** avertissement${count > 1 ? 's' : ''}.`;
        });

        message.editReply(`Liste des avertissements :\n${warnings.join('\n')}`);
      });

    }
  }
}