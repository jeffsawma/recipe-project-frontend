import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import api from '../api';

const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

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

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const LoginText = styled.p`
  margin-top: 1rem;
`;

const SignUp = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    const validationErrors = {};

    if (!username) validationErrors.username = 'Username is required';
    if (!password) validationErrors.password = 'Password is required';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await api.post('/users/register', { username, password });
      navigate('/login');
    } catch (error) {
      setErrors({
        general:
          error.response?.data?.message ||
          'An error occurred while creating the account',
      });
    }
  };

  return (
    <PageWrapper>
      <Container>
        <h2>Create Account</h2>

        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        {errors.username && <ErrorText>{errors.username}</ErrorText>}

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {errors.password && <ErrorText>{errors.password}</ErrorText>}

        {errors.general && <ErrorText>{errors.general}</ErrorText>}

        <Button onClick={handleSubmit}>Sign Up</Button>

        <LoginText>
          Already have an account? <Link to="/login">Log in</Link>
        </LoginText>
      </Container>
    </PageWrapper>
  );
};

export default SignUp;
