/**
 * S'assure qu'un utilisateur existe dans la base de données
 * @param {PrismaClient} db - Instance Prisma
 * @param {User} user - Objet utilisateur Discord
 * @param {GuildMember} member - Membre du serveur (optionnel)
 * @returns {Promise<Object>} - Utilisateur de la base de données
 */
async function ensureUser(db, user, member = null) {
    try {
        const userData = await db.users.upsert({
            where: { user_id: user.id },
            update: { 
                username: user.username,
                updated_at: new Date()
            },
            create: {
                user_id: user.id,
                username: user.username,
                joined_date: member?.joinedAt || new Date(),
                created_at: new Date(),
                updated_at: new Date()
            }
        });
        
        return userData;
    } catch (error) {
        console.error('Erreur lors de la création/mise à jour de l\'utilisateur:', error);
        throw error;
    }
}

module.exports = ensureUser;
