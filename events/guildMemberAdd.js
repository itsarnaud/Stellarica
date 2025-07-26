const ensureUser = require('../fonctions/ensureUser');

module.exports = async (client, member) => {
    try {
        await ensureUser(client.db, member.user, member);
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement du nouveau membre:', error);
    }
};
