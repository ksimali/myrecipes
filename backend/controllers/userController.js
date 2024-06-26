import bcrypt from 'bcryptjs'; // Pour le hachage des mots de passe
import jwt from 'jsonwebtoken'; // Pour créer des tokens JWT
import User from '../models/user.js'; // Le modèle Sequelize pour les utilisateurs

// Clé secrète pour les tokens JWT, à stocker de préférence dans une variable d'environnement
const secret = process.env.JWT_SECRET || 'my_jwt_recipe_secret';

// Fonction pour enregistrer un nouvel utilisateur
export const registerUser = async (req, res) => {
    try {
      // Récupération des données d'inscription de l'utilisateur
      const { username, password } = req.body;
  
      // Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 12);
  
      // Création de l'utilisateur avec le mot de passe haché
      const newUser = await User.create({
        username,
        password: hashedPassword,
      });
  
      // Réponse avec le statut 201 (Created) et les données de l'utilisateur créé
      res.status(201).json(newUser);
    } catch (error) {
      // En cas d'erreur, renvoie une réponse d'erreur
      res.status(500).json({ message: 'Erreur lors de la création de l’utilisateur', error });
    }
  };
  
  // Fonction pour connecter un utilisateur
  export const loginUser = async (req, res) => {
    try {
      // Récupération des données de connexion
      const { username, password } = req.body;
  
      // Recherche de l'utilisateur par son nom d'utilisateur
      const user = await User.findOne({ where: { username } });
  
      // Si l'utilisateur n'est pas trouvé, renvoie une erreur 404
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      // Vérification si le mot de passe est correct
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
  
      // Si le mot de passe est incorrect, renvoie une erreur 400
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Mot de passe incorrect' });
      }
  
      // Si le mot de passe est correct, création d'un token JWT
      const token = jwt.sign({ username: user.username, id: user.id }, secret, { expiresIn: '15min' });
  
      res.cookie('token', token, { httpOnly: true });
  
      // Renvoie les informations de l'utilisateur et le token
      res.status(200).json({ result: user, token });
    } catch (error) {
      // En cas d'erreur, renvoie une réponse d'erreur
      res.status(500).json({ message: 'Erreur lors de la connexion', error });
    }
  };