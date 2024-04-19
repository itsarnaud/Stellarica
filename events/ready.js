const discord = require('discord.js');
const loadSlashCommands = require('../loaders/loadSlashCommands');
const loadDatabase      = require('../loaders/loadDatabase');

module.exports = async client => {

    client.db = await loadDatabase();

    await loadSlashCommands(client);
    console.log(`${client.user.tag} est en ligne !`);

    // const guild = client.guilds.cache.get('815581732300128294');

    // guild.members.fetch().then(members => {
    //     members.forEach(member => {
    //         const userID = member.user.id;
    //         const username = member.user.username;
    //         const joinDate = member.joinedAt.toISOString().slice(0, 10);

    //         const sql = 'INSERT INTO users (userID, username, joinedDate) VALUES (?, ?, ?)';
    //         const values = [userID, username, joinDate];

    //         // Exécuter la requête SQL pour insérer le membre dans la base de données
    //         client.db.query(sql, values, (err, result) => {
    //             if (err) {
    //                 console.error('Erreur lors de l\'insertion du membre dans la base de données :', err);
    //                 return;
    //             }
    //             console.log('Membre ajouté à la base de données :', username);
    //         });
    //     });
    // }).catch(console.error);
}