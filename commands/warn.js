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

  async run (client, message, args, prisma) {
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

      let warnId = await client.function.createId('WARN');

      await client.function.ensureUser(prisma, user, member);

      await prisma.warns.create({
        data: {
          warn_id: warnId,
          user_id: member.user.id,
          moderator_id: message.user.tag,
          reason: reason,
          created_at: new Date()
        }
      });

      let actionId = await client.function.createId('ACTION');
      await prisma.moderation_logs.create({
        data: {
          action_id: actionId,
          action_type: 'warn',
          target_user_id: member.user.id,
          moderator_id: message.user.tag,
          reason: reason,
          guild_id: message.guild.id
        }
      });

    }

    catch (err) {
      console.error(err);
      return message.reply(`Erreur : ${err}`);
    }
  }
}