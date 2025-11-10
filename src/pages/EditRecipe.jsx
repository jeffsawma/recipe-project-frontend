// EditRecipe.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  max-width: 400px;
  width: 90%;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  color: black;
`;

// Input fields
const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
`;

// Select dropdown
const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
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

// Error text (optional)
const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

export default function EditRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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

  const update = async () => {
    let tempErrors = {};
    if (!recipe.name) tempErrors.name = "Nom de la recette requis";
    if (!recipe.ingredients) tempErrors.ingredients = "Ingrédients requis";
    if (!recipe.instructions) tempErrors.instructions = "Instructions requises";
    if (!recipe.category) tempErrors.category = "Catégorie requise";

    setErrors(tempErrors);
    if (Object.keys(tempErrors).length > 0) return;

    try {
      await api.put(`/recipes/${id}`, recipe);
      toast.success("Recette mise à jour avec succès !");
      navigate('/recettes');
    } catch (err) {
      console.error('Erreur lors de la mise à jour de la recette:', err);
      toast.error("Erreur lors de la mise à jour de la recette");
    }
  };

  if (!recipe) return null;

  return (
    <PageWrapper>
      <Container>
        <h2>Modifier recette</h2>
        <Input
          value={recipe.name}
          onChange={e => setRecipe({ ...recipe, name: e.target.value })}
          placeholder="Nom recette"
        />
        {errors.name && <ErrorText>{errors.name}</ErrorText>}

        <Input
          value={recipe.ingredients}
          onChange={e => setRecipe({ ...recipe, ingredients: e.target.value })}
          placeholder="Ingrédients"
        />
        {errors.ingredients && <ErrorText>{errors.ingredients}</ErrorText>}

        <Input
          value={recipe.instructions}
          onChange={e => setRecipe({ ...recipe, instructions: e.target.value })}
          placeholder="Instructions"
        />
        {errors.instructions && <ErrorText>{errors.instructions}</ErrorText>}

        <Select
          value={recipe.category}
          onChange={e => setRecipe({ ...recipe, category: e.target.value })}
        >
          <option value="">Choisir Catégorie</option>
          <option>Restauration rapide</option>
          <option>Aliments sains</option>
          <option>Repas combinés</option>
        </Select>
        {errors.category && <ErrorText>{errors.category}</ErrorText>}

        <Input
          value={recipe.imageUrl}
          onChange={e => setRecipe({ ...recipe, imageUrl: e.target.value })}
          placeholder="Image URL"
        />

        <Button onClick={update}>Mettre à jour recette</Button>
      </Container>
    </PageWrapper>
  );
}
