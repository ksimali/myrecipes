// Importation du module Router d'Express et des contrôleurs nécessaires
import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';

// Création d'un nouveau routeur Express
const router = Router();

// Route pour l'inscription des utilisateurs
router.post('/signup', registerUser);

// Route pour la connexion des utilisateurs
router.post('/login', loginUser);

// Exportation du routeur pour une utilisation dans l'application principale
export default router;
