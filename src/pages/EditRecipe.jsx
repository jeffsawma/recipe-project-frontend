import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await api.get(`/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error loading recipe:', error);
        toast.error('Unable to load recipe');
      }
    };

    fetchRecipe();
  }, [id]);

  const update = async () => {
    const validationErrors = {};

    if (!recipe.name) validationErrors.name = 'Recipe name is required';
    if (!recipe.ingredients) validationErrors.ingredients = 'Ingredients are required';
    if (!recipe.instructions) validationErrors.instructions = 'Instructions are required';
    if (!recipe.category) validationErrors.category = 'Category is required';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await api.put(`/recipes/${id}`, recipe);
      toast.success('Recipe updated successfully!');
      navigate('/recipes');
    } catch (error) {
      console.error('Error updating recipe:', error);
      toast.error('Unable to update recipe');
    }
  };

  if (!recipe) return null;

  return (
    <PageWrapper>
      <Container>
        <h2>Edit Recipe</h2>

        <Input
          value={recipe.name}
          onChange={(event) =>
            setRecipe({ ...recipe, name: event.target.value })
          }
          placeholder="Recipe name"
        />
        {errors.name && <ErrorText>{errors.name}</ErrorText>}

        <Input
          value={recipe.ingredients}
          onChange={(event) =>
            setRecipe({ ...recipe, ingredients: event.target.value })
          }
          placeholder="Ingredients"
        />
        {errors.ingredients && <ErrorText>{errors.ingredients}</ErrorText>}

        <Input
          value={recipe.instructions}
          onChange={(event) =>
            setRecipe({ ...recipe, instructions: event.target.value })
          }
          placeholder="Instructions"
        />
        {errors.instructions && <ErrorText>{errors.instructions}</ErrorText>}

        <Select
          value={recipe.category}
          onChange={(event) =>
            setRecipe({ ...recipe, category: event.target.value })
          }
        >
          <option value="">Choose a category</option>
          <option>Fast Food</option>
          <option>Healthy Food</option>
          <option>Combination Meals</option>
        </Select>
        {errors.category && <ErrorText>{errors.category}</ErrorText>}

        <Input
          value={recipe.imageUrl || ''}
          onChange={(event) =>
            setRecipe({ ...recipe, imageUrl: event.target.value })
          }
          placeholder="Image URL"
        />

        <Button onClick={update}>Update Recipe</Button>
      </Container>
    </PageWrapper>
  );
}
