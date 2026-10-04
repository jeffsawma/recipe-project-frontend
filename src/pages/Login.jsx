import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { AuthContext } from '../components/AuthContext.js';

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

const SignUpText = styled.p`
  margin-top: 1rem;
`;

const Login = () => {
  const { login } = useContext(AuthContext);
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

    const result = await login(username, password);

    if (result.success) {
      toast.success('Logged in successfully!');
      navigate('/recipes');
    } else {
      toast.error(result.message || 'Login failed');
    }
  };

  return (
    <PageWrapper>
      <Container>
        <h2>Login</h2>

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

        <Button onClick={handleSubmit}>Log In</Button>

        <SignUpText>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </SignUpText>
      </Container>
    </PageWrapper>
  );
};

export default Login;
