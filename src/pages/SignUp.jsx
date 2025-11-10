// SignUp.jsx
import { useState } from 'react';
import styled from 'styled-components';
import api from '../api';

// Full-page wrapper to cover entire viewport
const PageWrapper = styled.div`
  min-height: 100vh; /* full viewport height */
  width: 100vw;      /* full viewport width */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5; /* light gray background for full page */
`;

// Centered form container
const Container = styled.div`
  max-width: 400px;
  width: 90%; /* makes it slightly responsive on small screens */
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: black;
`;

// Input field
const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

// Button
const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
`;

// Error text
const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });

  const handleSubmit = async () => {
    let tempErrors = {};
    if (!username) tempErrors.username = "Nom d'utilisateur requis";
    if (!password) tempErrors.password = "Mot de passe requis";

    setErrors(tempErrors);
    if (Object.keys(tempErrors).length > 0) return;

    try {
      await api.post('/users/register', { username, password });
      // Optionally redirect to login page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageWrapper>
      <Container>
        <h2>S'inscrire</h2>
        <Input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <ErrorText>{errors.username}</ErrorText>}
        <Input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <ErrorText>{errors.password}</ErrorText>}
        <Button onClick={handleSubmit}>S'inscrire</Button>
      </Container>
    </PageWrapper>
  );
};

export default SignUp;
