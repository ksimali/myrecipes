import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Login = () => {
  return (
    <FormContainer className="mt-5">
        <h1 className="text-center">Connexion</h1>
        <form>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
                <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Mot de passe</label>
                <input
                    type="text"
                    className="form-control"
                    id="password"
                    placeholder="Password" 
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary w-100">Se connecter</button>
        </form>
    </FormContainer>
  )
}

export default Login