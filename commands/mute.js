const discord  = require('discord.js');
const ms       = require('ms');

module.exports = {
  name: 'mute',
  description: 'Mute un membre temporairement.',
  permission: discord.PermissionFlagsBits.ModerateMembers,
  dm: false,
  options: [{
    type: 'user',
    name: 'membre',
    description: 'Le membre a mute',
    required: true
  }, {
    type: 'string',
    name: 'temps',
    description: 'temps du mute',
    required: true
  }, {
    type: 'string',
    name: 'raison',
    description: 'La raison du mute',
    required: false
  }],

  async run (client, message, args) {

    try {
      let userArg = args.get('membre');
      if (!userArg) return message.reply('Aucun membre spécifié...');

      let user    = await client.users.fetch(userArg.value);
      if (!user) return message.reply('Je n\'ai pas trouvé ce membre...');

      let time    = args.getString('temps')
      if (!time) return message.reply('Pas de temps !');
      if (isNaN(ms(time))) return message.reply('Pas le bon format !');
      if (ms(time) > 2419200000) return message.reply('Le mute ne peux pas durer plus de 28 jours.');

      let member    = message.guild.members.cache.get(user.id);
      let reasonArg = args.get('raison');
      let reason    = reasonArg ? reasonArg.value: "Aucune raison donnée.";

      if ((await message.guild.fetchOwner()).id === user.id) return message.reply('Quoi ? Tu veux vraiment mute le super fonda trop cool ? N\'importe quoi...');
      if (message.user.id === user.id) return message.reply('Tu ne peux pas te mute toi-même !');
      if (member && !member.moderatable) return message.reply('Je ne peux pas mute cette personne.');
      if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply('Tu n\'a pas le droit de le mute !');
      if (member.isCommunicationDisabled()) return message.reply('Ah ! Il est déjà mute !');

      try {
        await member.send(`Tu as été mute de **${message.guild.name}** pendant ${time} pour la raison suivante : **${reason}** \n Si tu penses que c'est une erreur, n'hésite pas à nous contacter.`);
      } catch { }

      await message.reply(`Le membre \`${user.tag}\` à été mute par ${message.user.tag} pendant ${time} pour la raison suivante : **${reason}**`);
      await member.timeout(ms(time), reason);


    } catch (err) {
      console.error(err);
      return message.reply('Erreur : ' + err)
    }
  }

}