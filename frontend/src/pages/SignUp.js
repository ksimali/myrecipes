import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(username, password);
      alert('User registered successfully!');
      navigate('/login');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <FormContainer className="mt-5">
      <h1 className="text-center">S'incrire</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">S'inscrire</button>

      </form>
      
    </FormContainer>
  )
}

export default SignUp