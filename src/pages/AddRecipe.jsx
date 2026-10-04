import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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

const Select = styled.select`
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

export default function AddRecipe() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState({});

  const save = async () => {
    const validationErrors = {};

    if (!name) validationErrors.name = 'Recipe name is required';
    if (!ingredients) validationErrors.ingredients = 'Ingredients are required';
    if (!instructions) validationErrors.instructions = 'Instructions are required';
    if (!category) validationErrors.category = 'Category is required';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await api.post('/recipes', {
        name,
        ingredients,
        instructions,
        category,
        imageUrl,
      });

      toast.success('Recipe added successfully!');
      navigate('/recipes');
    } catch (error) {
      console.error('Error adding recipe:', error);
      toast.error('Unable to add recipe');
    }
  };

  return (
    <PageWrapper>
      <Container>
        <h2>Add Recipe</h2>

        <Input
          placeholder="Recipe name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        {errors.name && <ErrorText>{errors.name}</ErrorText>}

        <Input
          placeholder="Ingredients"
          value={ingredients}
          onChange={(event) => setIngredients(event.target.value)}
        />
        {errors.ingredients && <ErrorText>{errors.ingredients}</ErrorText>}

        <Input
          placeholder="Instructions"
          value={instructions}
          onChange={(event) => setInstructions(event.target.value)}
        />
        {errors.instructions && <ErrorText>{errors.instructions}</ErrorText>}

        <Select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">Choose a category</option>
          <option>Fast Food</option>
          <option>Healthy Food</option>
          <option>Combination Meals</option>
        </Select>
        {errors.category && <ErrorText>{errors.category}</ErrorText>}

        <Input
          placeholder="Image URL"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
        />

        <Button onClick={save}>Add Recipe</Button>
      </Container>
    </PageWrapper>
  );
}
