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

  async run (client, message, args, db) {
    try {
      let warn = args.get('warn_id').value;
      let member = args.get('membre');
      await message.deferReply();
      if (warn) {
        db.query('DELETE FROM warns WHERE userID = ? AND warnID = ?', [member.user.id, warn], async (err, res) => {
          if (err) {
            return message.editReply('Erreur lors de l\'exécution de la requête SQL :' + err);
          }
          return message.editReply(`L'avertissement \`${warn}\` à bien été supprimé.`);
        })
        
      }

      else {
        db.query('DELETE FROM warns WHERE userID = ?', [member.user.id], async (err, res) => {
          if (err) {
            return message.editReply('Erreur lors de l\'exécution de la requête SQL :' + err)
          }

          return message.editReply(`Les avertissements du membre \`${member.user.username}\` ont bien été supprimé.`);
        })
      }
    }

    catch (err) {
      console.error(err)
      return message.reply(`Erreur : ${err}`);
    }
  }
}