const discord = require('discord.js');

module.exports = {
  name: 'kick',
  description: 'Kick un membre',
  permission: discord.PermissionFlagsBits.KickMembers,
  dm: false,
  options: [
  {
    type: 'user',
    name: 'membre',
    description: 'Le membre à kick',
    required: true
  },
  {
    type: 'string',
    name: 'raison',
    description: 'La raison du kick',
    required: false
  }],

  async run (client, message, args) {
    try {
      let userArg = args.get('membre');
      if (!userArg) return message.reply('Aucun membre spécifié...');
      let user    = await client.users.fetch(userArg.value);
      if (!user) return message.reply('Je n\'ai pas trouvé ce membre...');

      let member    = message.guild.members.cache.get(user.id);
      let reasonArg = args.get('raison');
      let reason    = reasonArg ? reasonArg.value: "Aucune raison donnée.";
      
      if ((await message.guild.fetchOwner()).id === user.id) return message.reply('Tu ne peux pas kick le merveilleux et magnifique propriétaire du serveur !');
      if (message.user.id === user.id) return message.reply('Tu ne peux pas te kick toi même !');
      if (member && !member.bannable) return message.reply('Je ne peux pas kick cette personne.');
      if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply('Tu n\'as pas le droit de le kick !');
      
      try {
        await member.send(`Tu as été kick de **${message.guild.name}** pour la raison suivante : **${reason}**.`);
      } catch { }

      await message.reply(`Le membre \`${user.tag}\` à  été kick par ${message.user.tag} pour la raison suivante : **${reason}**.`);
      await member.kick(reason);
    }
    catch (err) {
      console.error(err);
      return message.reply('Je n\'ai pas pu trouver ce membre...');
    }
  }
};