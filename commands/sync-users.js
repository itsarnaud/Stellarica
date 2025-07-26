const discord = require('discord.js');
const ensureUser = require('../fonctions/ensureUser');

module.exports = {
    name: 'sync-users',
    description: 'Synchronise tous les membres du serveur avec la base de données (Admin seulement)',
    permission: discord.PermissionFlagsBits.Administrator,
    dm: false,
    options: [],
    
    async run(client, interaction, options, db) {
        if (!interaction.member.permissions.has(discord.PermissionFlagsBits.Administrator)) {
            return interaction.reply({
                content: '❌ Vous devez être administrateur pour utiliser cette commande.',
                ephemeral: true
            });
        }

        await interaction.deferReply({ ephemeral: true });

        try {
            const guild = interaction.guild;
            const members = await guild.members.fetch();
            
            let successCount = 0;
            let errorCount = 0;

            const memberArray = Array.from(members.values());
            const batchSize = 10;
            
            for (let i = 0; i < memberArray.length; i += batchSize) {
                const batch = memberArray.slice(i, i + batchSize);
                
                await Promise.all(batch.map(async (member) => {
                    try {
                        await ensureUser(db, member.user, member);
                        successCount++;
                    } catch (error) {
                        errorCount++;
                    }
                }));
                
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            await interaction.editReply({
                content: `✅ Synchronisation terminée!\n📊 **${successCount}** utilisateurs synchronisés\n❌ **${errorCount}** erreurs`
            });

        } catch (error) {
            console.error('Erreur lors de la synchronisation:', error);
            await interaction.editReply({
                content: '❌ Une erreur est survenue lors de la synchronisation.'
            });
        }
    }
};
