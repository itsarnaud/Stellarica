const discord = require('discord.js');

module.exports = {
  name: 'warn',
  description: 'Warn un membre',
  permission: discord.PermissionFlagsBits.ModerateMembers,
  dm: false,
  options: [{
    type: 'user',
    name: 'membre',
    description: 'Le membre à warn',
    required: true
  }, {
    type: 'string',
    name: 'raison',
    description: 'La raison du warn',
    required: false
  }],

  async run (client, message, args, db) {
    try {
      let userArg = args.get('membre');
      if (!userArg) return message.reply('Aucun membre spécifié...');

      let user = await client.users.fetch(userArg.value);
      if (!user) return message.reply('Je n\'ai pas trouvé ce membre...');

      let member = message.guild.members.cache.get(user.id);
      if (!member) return message.reply('Ce membre n\'est pas dans ce serveur...');

      let reasonArg = args.get('raison');
      let reason    = reasonArg ? reasonArg.value: 'Aucune raison donnée.';

      if ((await message.guild.fetchOwner()).id === user.id) return message.reply('Tu ne peux pas warn le merveilleux et magnifique propriétaire du serveur !');
      if (message.user.id === user.id) return message.reply('Tu ne peux pas te warn toi-même');
      if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply('Tu ne peux pas warn ce membre...');
      if (user.id === client.user.id) return message.reply('Tu ne peux pas warn le bot !');

      try {
        await member.send(`Tu as reçu un warn dans le serveur **${message.guild.name}** pour la raison suivante : **${reason}**`);
      } catch { }

      await message.reply(`Le membre \`${user.tag}\` à été warn par ${message.user.tag} pour la raison suivante : **${reason}**`);

      let ID = await client.function.createId('WARN');
      let createdDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
      db.query(`INSERT INTO warns (warnID, userID, moderatorID, reason, createdDate) VALUES (?, ?, ?, ?, ?)`, [ID, member.user.id, message.user.tag, reason, createdDate], (err, result) => {
        if (err) {
          console.error('Erreur lors de l\'exécution de la requête SQL :', err);
        } else {
          console.log('Résultat de la requête SQL :', result);
        }
      });

    }

    catch (err) {
      console.log(err);
      return message.reply(`Erreur : ${err}`);
    }
  }
}