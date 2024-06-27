import express from 'express';
import { sequelize } from './config/database.js'; // Configuration Sequelize pour la base de données
import { config } from 'dotenv'; // Module pour charger les variables d'environnement du fichier .env
import { errorHandler } from './middlewares/errorHandler.js'; // Middleware pour la gestion des erreurs
import bodyParser from 'body-parser'; // Middleware pour analyser le corps des requêtes entrantes
import userRoute from './routes/userRoutes.js'; // Routeur pour les routes d'authentification
import recipeRoute from './routes/recipeRoutes.js'; // Routeur pour les routes de gestion des recettes


// Chargement des variables d'environnement
config();

const app = express();

// Utilisation de bodyParser pour analyser les requêtes JSON entrantes
app.use(bodyParser.json());

// Définition des routes pour l'authentification
app.use('/api/user', userRoute);

// Définition des routes pour la gestion des recettes
app.use('/api/recipe', recipeRoute);

// Utilisation du middleware pour la gestion des erreurs
app.use(errorHandler);

// Définition du port sur lequel le serveur va écouter
const PORT = process.env.PORT || 3000;

// Synchronisation avec la base de données et démarrage du serveur
sequelize.sync().then(() => {
    console.log('Database synchronized.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}.`);
    });
}).catch(err => {
    console.error('Database synchronization error:', err);
});
