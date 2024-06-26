// Importation du module Router d'Express et des contrôleurs nécessaires
import { Router } from 'express';
import { getAllRecipes, addRecipe, updateRecipe, getRecipeById, deleteRecipe } from '../controllers/recipeController.js';

// Importation des middlewares d'authentification et d'autorisation
import { authenticateToken } from '../middlewares/authMiddleware.js';

// Création d'un nouveau routeur Express
const router = Router();

// Route pour lister toutes les recettes
router.get('/', authenticateToken, getAllRecipes);

// Route pour recuperer le detail d'une recette
router.get('/:id', authenticateToken, getRecipeById);

// Route pour ajouter une recette
router.post('/', authenticateToken, addRecipe);

// Route pour modifier une recette
router.put('/:id', authenticateToken, updateRecipe);

// Route pour modifier une recette
router.delete('/:id', authenticateToken, deleteRecipe);

// Exportation du routeur pour une utilisation dans l'application principale
export default router;
