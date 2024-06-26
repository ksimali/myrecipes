import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import { AuthContext } from '../components/AuthContext';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const ErrorText = styled.div`
  color: red;
  margin-top: -10px;
  margin-bottom: 10px;
  font-size: 0.875em;
`;

const Login = () => {
  // gestion de l'etat
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });

  //utilisation du contexte : acces à la fonction login de AuthContext en la renommant loginContext
  const { login: loginContext } = useContext(AuthContext);

  // pour naviguer efficacement vers d'autres route
  const navigate = useNavigate();
  
  // gestion des erreurs du formulaire
  const validate = () => {
    let formErrors = {};

    if (!username) {
      formErrors.username = "Le nom d'utilisateur est requis.";
    } else if(username.length < 2){
      formErrors.username = "Le mot de passe doit contenir au moins 2 caractères."
    } else if (!/^[a-zA-Z]+$/.test(username)) {
      formErrors.username = "Le nom d'utilisateur doit contenir uniquement des lettres.";
    }

    if (!password) {
      formErrors.password = 'Le mot de passe est requis.';
    } else if (password.length < 6) {
      formErrors.password = 'Le mot de passe doit contenir au moins 6 caractères.';
    } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
      formErrors.password = 'Le mot de passe doit contenir des lettres et des chiffres.';
    }

    setErrors(formErrors);

    return !formErrors.username && !formErrors.password;

  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const response = await login(username, password);
      loginContext(response.data.token);
      navigate('/recipes');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <FormContainer className="mt-5">
        <h1 className="text-center">Connexion</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
                <input
                    type="text"
                    className="form-control mb-3"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                {errors.username && <ErrorText>{errors.username}</ErrorText>}
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Mot de passe</label>
                <input
                    type="text"
                    className="form-control mb-3"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" 
                />
                {errors.password && <ErrorText>{errors.password}</ErrorText>}
            </div>
            <button type="submit" className="btn btn-primary w-100">Se connecter</button>
        </form>
    </FormContainer>
  )
}

export default Login