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

  async run (client, message, args, prisma) {

    let userArg = args.get('membre');

    await message.deferReply();

    if (userArg) {
      let user = await client.users.fetch(userArg.value);
      if (!user) return message.editReply('Je n\'ai pas trouvé ce membre...');

      let member = message.guild.members.cache.get(user.id);
      if (!member) return message.editReply('Ce membre n\'est pas dans ce serveur...');

      try {
        const warns = await prisma.warns.findMany({
          where: { 
            user_id: member.user.id,
            is_active: true
          },
          include: {
            user: true
          },
          orderBy: { created_at: 'desc' }
        });

        if (warns.length === 0) {
          return message.editReply('Ce membre n\'a pas reçu d\'avertissement.');
        }

        let warnings = '';
        for (const warn of warns) { 
          const user = await client.users.fetch(warn.user_id);
          warnings += `Avertissement \`${warn.warn_id}\` de **${user.username}** : **${warn.reason}**\n`;
        }

        return message.editReply(warnings);

      } catch (err) {
        console.error('Erreur Prisma :', err);
        return message.editReply('Erreur lors de la récupération des avertissements.');
      }
    }

    else {

      try {
        const warns = await prisma.warns.findMany({
          where: { is_active: true },
          include: {
            user: true
          }
        });
    
        if (warns.length === 0) {
          return message.editReply('Aucun membre n\'a reçu d\'avertissement.');
        }

        let warningCounts = {};
        for (const warn of warns) {
          const user = await client.users.fetch(warn.user_id);
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

      } catch (err) {
        console.error('Erreur Prisma :', err);
        return message.editReply('Erreur lors de la récupération des avertissements.');
      }

    }
  }
}