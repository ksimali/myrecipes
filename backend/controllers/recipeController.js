import Recipe from "../models/recipe.js";

export const addRecipe = async (req, res, next) => {
    try {
        // Crée une nouvelle recette avec les données envoyées dans le corps de la requête
        const recipe = await Recipe.create(req.body);
        // Envoie de la recette créée au client avec le statut 201 (Created)
        res.status(201).json(recipe);
    } catch (error) {
        next(error);
    }
};

export const updateRecipe = async (req, res, next) => {
    try {
        // Recherche d'une recette par son ID
        const recipe = await Recipe.findByPk(req.params.id);
        if (recipe) {
          // Si la recette est trouvée, la mise à jour avec les nouvelles données
          await recipe.update(req.body);
          // Envoie de la recette mise à jour au client
          res.status(200).json(recipe);
        } else {
          // Si la recette n'est pas trouvée, envoie un message d'erreur 404
          res.status(404).json({ message: 'Recette non trouvée' });
        }
    } catch (error) {
        next(error);
    }
};

export const deleteRecipe = async (req, res, next) => {
    try {
        // Recherche d'une recette par son ID
        const recipe = await Recipe.findByPk(req.params.id);
        if (recipe) {
          // Si la recette est trouvée, la supprimer
          await recipe.destroy();
          // Envoie un message de confirmation de suppression
          res.status(200).json({ message: 'Recette supprimée' });
        } else {
          // Si la recette n'est pas trouvée, envoie un message d'erreur 404
          res.status(404).json({ message: 'Recette non trouvée' });
        }
    } catch (error) {
        next(error);
    }
};

export const getRecipeById = async (req, res, next) => {
    try {
        // Recherche d'une recette par son ID (Primary Key) avec findByPk
        const recipe = await Recipe.findByPk(req.params.id);
        if (recipe) {
          // Si la recette est trouvée, envoie la recette au client
          res.status(200).json(recipe);
        } else {
          // Si la recette n'est pas trouvée, envoie un message d'erreur 404 (Not Found)
          res.status(404).json({ message: 'Recette non trouvée' });
        }
    } catch (error) {
        next(error);
    }
};

export const getAllRecipes = async (req, res, next) => {
    try {
        // Utilisation de la méthode findAll de Sequelize pour récupérer toutes les recettes
        const recipes = await Recipe.findAll();
        // Envoie des données récupérées au client avec le statut 200 (OK)
        res.status(200).json(recipes);
    } catch (error) {
        // En cas d'erreur, passe l'erreur au middleware suivant
        next(error);
    }
};