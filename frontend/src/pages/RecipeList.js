import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecipes, deleteRecipe, updateRecipe } from '../api';
import { AuthContext } from '../components/AuthContext';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipeId, setEditingRecipeId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await getRecipes(authToken);
        setRecipes(response.data);
      } catch (error) {
        toast.error('Failed to fetch recipes');
      }
    };

    fetchRecipes();
  }, [authToken]);

  //
  const handleDelete = async (recipeId) => {
    try {
        const response = await deleteRecipe(authToken, recipeId);
        if (response.status === 200) { // Assuming 200 OK is the success status
          setRecipes(recipes.filter(recipe => recipe.id !==recipeId));
          toast.success('Recipe deleted successfully!');
        } else {
            toast.error('Failed to delete recipe');
        }
    } catch (error) {
        toast.error('Failed to delete task');
    }
  };
  //
  const handleEdit = (recipeId, currentName) => {
    setEditingRecipeId(recipeId);
    setEditingName(currentName);
  };

  //
  const handleUpdate = async (recipeId) => {
    try {
        const response = await updateRecipe(authToken, recipeId, { title: editingName });
        if (response.status === 200) { // Assuming 200 OK is the success status
          setRecipes(recipes.map(recipe => (recipe.id === recipeId ? { ...recipe, title: editingName } : recipe)));
          setEditingRecipeId(null);
          setEditingName('');
          toast.success('Recipe updated successfully!');
          navigate('/recipes'); // Redirection vers la liste des recettes après modification
        } else {
            toast.error('Update échoué');
        }
    } catch (error) {
        toast.error('Failed to update recipe');
    }
  };

  //
  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <h1 className="text-center">Les Recettes</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Recherche des recettes ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className="list-group">
        {filteredRecipes.map(recipe => (
          <li key={recipe.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editingRecipeId === recipe.id ? (
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                />
                <button className="btn btn-primary" onClick={() => handleUpdate(recipe.id)}>Save</button>
                <button className="btn btn-secondary" onClick={() => setEditingRecipeId(null)}>Cancel</button>
              </div>
            ) : (
              <>
                {recipe.name}
                <div>
                  <button className="btn btn-warning me-2" onClick={() => handleEdit(recipe.id, recipe.title)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(recipe.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default RecipeList