// AddRecipe.jsx
import { useState } from 'react';
import styled from 'styled-components';
import api from '../api';
import { useNavigate } from 'react-router-dom';
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

// Centered form container
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

// Error text (optional if you want to show validation)
const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

export default function AddRecipe() {
  const [name, setName] = useState('');
  const [ingredients, setIng] = useState('');
  const [instructions, setIns] = useState('');
  const [category, setCat] = useState('');
  const [imageUrl, setImg] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const save = async () => {
    let tempErrors = {};
    if (!name) tempErrors.name = "Nom de la recette requis";
    if (!ingredients) tempErrors.ingredients = "Ingrédients requis";
    if (!instructions) tempErrors.instructions = "Instructions requises";
    if (!category) tempErrors.category = "Catégorie requise";
    setErrors(tempErrors);
    if (Object.keys(tempErrors).length > 0) return;

    try {
      await api.post('/recipes', { name, ingredients, instructions, category, imageUrl });
      toast.success("Recette ajoutée avec succès !");
      navigate('/recettes');
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la recette:', err);
      toast.error("Erreur lors de l'ajout de la recette");
    }
  };

  return (
    <PageWrapper>
      <Container>
        <h2>Ajouter une recette</h2>
        <Input placeholder="Nom recette" value={name} onChange={e => setName(e.target.value)} />
        {errors.name && <ErrorText>{errors.name}</ErrorText>}

        <Input placeholder="Ingrédients" value={ingredients} onChange={e => setIng(e.target.value)} />
        {errors.ingredients && <ErrorText>{errors.ingredients}</ErrorText>}

        <Input placeholder="Instructions" value={instructions} onChange={e => setIns(e.target.value)} />
        {errors.instructions && <ErrorText>{errors.instructions}</ErrorText>}

        <Select value={category} onChange={e => setCat(e.target.value)}>
          <option value="">Choisir Catégorie</option>
          <option>Restauration rapide</option>
          <option>Aliments sains</option>
          <option>Repas combinés</option>
        </Select>
        {errors.category && <ErrorText>{errors.category}</ErrorText>}

        <Input placeholder="Image URL" value={imageUrl} onChange={e => setImg(e.target.value)} />

        <Button onClick={save}>Ajouter recette</Button>
      </Container>
    </PageWrapper>
  );
}
