// RecipeDetail.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import api from '../api';
import { toast } from 'react-toastify';

// Full-page wrapper
const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

// Centered container
const Container = styled.div`
  max-width: 600px;
  width: 90%;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  color: black;
`;

// Recipe image
const Img = styled.img`
  width: 100%;
  border-radius: 6px;
  margin-bottom: 1rem;
`;

// Section title
const Title = styled.h2`
  margin-bottom: 0.5rem;
`;

// Subtitle for category
const Category = styled.h4`
  margin-bottom: 1rem;
  color: #555;
`;

// Paragraphs
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
        const res = await api.get(`/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        console.error('Erreur lors du chargement de la recette:', err);
        toast.error('Erreur lors du chargement de la recette');
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return null;

  return (
    <PageWrapper>
      <Container>
        <Img src={recipe.imageUrl} alt={recipe.name} />
        <Title>{recipe.name}</Title>
        <Category>{recipe.category}</Category>
        <Paragraph><b>Ingrédients:</b> {recipe.ingredients}</Paragraph>
        <Paragraph><b>Instructions:</b> {recipe.instructions}</Paragraph>
      </Container>
    </PageWrapper>
  );
}
