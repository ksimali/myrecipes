import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { User } from './user.js'

export const Recipe = sequelize.define('Recipe', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ingredients: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    instructions: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // Modèle de la table parente
            key: 'id' // Colonne de la table parente à laquelle la clé étrangère se réfère
        }
    }
    }, {
        tableName: 'Recipe', // Définition explicite du nom de la table
        timestamps: false,
});

// Définir la relation entre Recipe et User
Recipe.belongsTo(User, { foreignKey: 'userId' });

export default Recipe;
