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
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
  
      await sequelize.sync({ force: true });
      console.log('All models were synchronized successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
};
  
initDb();