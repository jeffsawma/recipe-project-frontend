// Login.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/authContext.jsx';
import { toast } from 'react-toastify';
import styled from 'styled-components';

// Full-page wrapper to cover entire viewport
const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

// Centered form container
const Container = styled.div`
  max-width: 400px;
  width: 90%;
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

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // For redirecting after login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });

  const handleSubmit = async () => {
    let tempErrors = {};
    if (!username) tempErrors.username = "Nom d'utilisateur requis";
    if (!password) tempErrors.password = "Mot de passe requis";

    setErrors(tempErrors);
    if (Object.keys(tempErrors).length > 0) return;

    const res = await login(username, password);
    if (res.success) {
      toast.success('Connecté avec succès !');
      navigate('/recipes'); // Redirect to recettes page
    } else {
      toast.error(res.message || 'Échec de la connexion');
    }
  };

  return (
    <PageWrapper>
      <Container>
        <h2>Connexion</h2>
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

        <Button onClick={handleSubmit}>Se connecter</Button>
      </Container>
    </PageWrapper>
  );
};

export default Login;
