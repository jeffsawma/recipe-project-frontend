import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  max-width: 600px;
  width: 90%;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: black;
`;

const Img = styled.img`
  width: 100%;
  border-radius: 6px;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  margin-bottom: 0.5rem;
`;

const Category = styled.h4`
  margin-bottom: 1rem;
  color: #555;
`;

const Paragraph = styled.p`
  text-align: left;
  margin-bottom: 0.5rem;
`;

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

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

  if (!recipe) return null;

  return (
    <PageWrapper>
      <Container>
        {recipe.imageUrl && <Img src={recipe.imageUrl} alt={recipe.name} />}

        <Title>{recipe.name}</Title>
        <Category>{recipe.category}</Category>

        <Paragraph>
          <strong>Ingredients:</strong> {recipe.ingredients}
        </Paragraph>

        <Paragraph>
          <strong>Instructions:</strong> {recipe.instructions}
        </Paragraph>
      </Container>
    </PageWrapper>
  );
}
