import { Sequelize } from 'sequelize';
import { config } from 'dotenv'; // Module pour charger les variables d'environnement du fichier .env

// Chargement des variables d'environnement
config();

export const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
});

const initDb = async () => {
    try {
      // await sequelize.authenticate();
      // console.log('Connection has been established successfully.');
  
      // await sequelize.sync({ force: true });
      // console.log('All models were synchronized successfully.');
      // Synchronisation des tables dans l'ordre approprié
      sequelize.authenticate().then(() => {
          User = require('./models/User')(sequelize, Sequelize);
          Recipe = require('./models/Recipe')(sequelize, Sequelize);

      // Sync User table first
          return User.sync();
      }).then(() => {
          // Then sync Recipe table which references User
          return Recipe.sync();
      }).then(() => {
          console.log('Tables synchronized successfully');
      }).catch(err => {
          console.error('Error synchronizing tables:', err);
      });
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
};
  
initDb();