require('dotenv').config();

const { PrismaClient } = require('../generated/prisma');

module.exports = () => {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

  prisma.$connect()
    .then(() => {
      console.log('Connexion à la base de données établie avec Prisma !');
    })
    .catch((err) => {
      console.error('Erreur lors de la connexion à la base de données :', err);
    });

  return prisma;
}