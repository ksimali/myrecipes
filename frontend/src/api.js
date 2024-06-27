import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL; 

export const signup = (username, password) => {
  return axios.post(`${API_URL}/auth/signup`, { username, password });
};

export const login = (username, password) => {
  return axios.post(`${API_URL}/auth/login`, { username, password });
};

export const getRecipes = (token) => {
  return axios.get(`${API_URL}/recipes`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const addRecipe = (token, recipe) => {
  return axios.post(`${API_URL}/recipes`, recipe, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const deleteRecipe = (token, recipeId) => {
  return axios.delete(`${API_URL}/recipes/${recipeId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateRecipe = (token, recipeId, recipe) => {
  return axios.put(`${API_URL}/tasks/${recipeId}`, recipe, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
