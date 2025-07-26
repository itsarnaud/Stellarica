const discord = require('discord.js');

module.exports = {
  name: 'delwarn',
  description: 'Supprime le warn d\'un membre',
  permission: discord.PermissionFlagsBits.ModerateMembers,
  dm: false,
  options: [{
    type: 'user',
    name: 'membre',
    description: 'Membre pour retirer un warm',
    required: true
  }, {
    type: 'string',
    name: 'warn_id',
    description: 'ID du warn (trouvable avec la commande \'/warnings user\')',
    required: false
  }],

  async run (client, message, args, prisma) {
    try {
      let warnArg = args.get('warn_id');
      let memberArg = args.get('membre');
      
      await message.deferReply();
      
      if (warnArg && warnArg.value) {
        try {
          const deletedWarn = await prisma.warns.deleteMany({
            where: {
              user_id: memberArg.user.id,
              warn_id: warnArg.value
            }
          });

          if (deletedWarn.count === 0) {
            return message.editReply(`Aucun avertissement trouvé avec l'ID \`${warnArg.value}\` pour ce membre.`);
          }

          let actionId = await client.function.createId('ACTION');
          await prisma.moderation_logs.create({
            data: {
              action_id: actionId,
              action_type: 'delwarn',
              target_user_id: memberArg.user.id,
              moderator_id: message.user.tag,
              reason: `Suppression du warn ${warnArg.value}`,
              guild_id: message.guild.id
            }
          });

          return message.editReply(`L'avertissement \`${warnArg.value}\` a bien été supprimé.`);

        } catch (err) {
          console.error('Erreur Prisma :', err);
          return message.editReply('Erreur lors de la suppression de l\'avertissement.');
        }
      }

      else {
        try {
          const deletedWarns = await prisma.warns.deleteMany({
            where: {
              user_id: memberArg.user.id
            }
          });

          if (deletedWarns.count === 0) {
            return message.editReply(`Le membre \`${memberArg.user.username}\` n'a aucun avertissement à supprimer.`);
          }

          let actionId = await client.function.createId('ACTION');
          await prisma.moderation_logs.create({
            data: {
              action_id: actionId,
              action_type: 'delwarn',
              target_user_id: memberArg.user.id,
              moderator_id: message.user.tag,
              reason: `Suppression de tous les warns (${deletedWarns.count} avertissements)`,
              guild_id: message.guild.id
            }
          });

          return message.editReply(`Les ${deletedWarns.count} avertissement${deletedWarns.count > 1 ? 's' : ''} du membre \`${memberArg.user.username}\` ont bien été supprimés.`);

        } catch (err) {
          console.error('Erreur Prisma :', err);
          return message.editReply('Erreur lors de la suppression des avertissements.');
        }
      }
    }

    catch (err) {
      console.error(err);
      return message.reply(`Erreur : ${err}`);
    }
  }
}