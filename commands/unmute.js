const discord = require('discord.js');

module.exports = {
  name: 'unmute',
  description: 'Enlever le mute d\'un membre',
  permission: discord.PermissionFlagsBits.ModerateMembers,
  dm: false,
  options: [{
    type: 'user',
    name: 'membre',
    description: 'Le membre à unmute',
    required: true
  }, {
    type: 'string',
    name: 'raison',
    description: 'La raison du unmute',
    required: false
  }],

  async run (client, message, args) {
    try {
      let userArg = args.get('membre');
      if (!userArg) return message.reply('Aucun membre spécifié...');

      let user    = await client.users.fetch(userArg.value);
      if (!user) return message.reply('Je n\'ai pas trouvé ce membre...');
      let member  = message.guild.members.cache.get(user.id);

      let reasonArg = args.get('raison');
      let reason    = reasonArg ? reasonArg.value: 'Aucune raison donnée.';

      if (!member.moderatable) return message.reply('Je ne peux pas unmute cette personne.');
      if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply('Tu n\'a pas le droit de l\'unmute !');
      if (!member.isCommunicationDisabled()) return message.reply('Même pas besoin, il est pas mute !');

      try {
        await member.send(`Tu as été unmute de **${message.guild.name}** pour la raison suivante : **${reason}**`);
      } catch { }

      await message.reply(`Le membre \`${user.tag}\` à été unmute par ${message.user.tag} pour la raison suivante : **${reason}**`);
      await member.timeout(null, reason);

    }

    catch (err) {
      console.error(err);
      return message.reply(`Erreur : ${err}`);
    }
  }
}