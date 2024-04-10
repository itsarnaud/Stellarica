const discord = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Ban un membre',
  permission: discord.PermissionFlagsBits.BanMembers,
  dm: false,
  options: [
  {
    type: 'user',
    name: 'membre',
    description: 'Le membre à bannir',
    required: true
  },
  {
    type: 'string',
    name: 'raison',
    description: 'La raison du ban',
    required: false
  }],

  async run (client, message, args) {
    try {
      let userArg = args.get("membre");
      if (!userArg) return message.reply('Aucun membre spécifié...');
      let user = await client.users.fetch(userArg.value);
      console.dir(user);
      if (!user) return message.reply('Je n\'ai pas pu trouver ce membre...');
  
      let member    = message.guild.members.cache.get(user.id); // user id
      let reasonArg = args.get("raison"); // recupere la raison du ban
      let reason    = reasonArg ? reasonArg.value : "Aucune raison donnée";
      console.log(`Raison : ${reason}`); // log la raison du ban
      
      if ((await message.guild.fetchOwner()).id === user.id) return message.reply('Tu ne peux pas bannir le merveilleux et magnifique propriétaire du serveur !');
      if (message.user.id === user.id) return message.reply('Tu ne peux pas te bannir toi-même');
      if (member && !member.bannable) return message.reply('Je ne peux pas bannir ce membre...');
      if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply('Tu ne peux pas bannir ce membre...');
      if ((await message.guild.bans.fetch()).get(user.id)) return message.reply('Ce membre est déjà banni...');

      try {
        await member.send(`Tu as été banni de **${message.guild.name}** pour la raison suivante : **${reason}**.`);
      } catch { }

      await message.reply(`Le membre \`${user.tag}\` à été banni par ${message.user.tag} pour la raison suivante : **${reason}**`);

      await message.guild.bans.create(user.id, { reason });
     
    } catch (err) {
      console.error(err);
      return message.reply('Je n\'ai pas pu trouver ce membre...');
    }
  }
}