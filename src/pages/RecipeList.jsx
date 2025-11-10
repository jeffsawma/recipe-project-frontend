// RecipeList.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../api';
import { toast } from 'react-toastify';

// Full-page wrapper
const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* align top, we can add spacing if needed */
  background-color: #f5f5f5;
  padding: 2rem 0;
`;

// Centered container for the list
const Container = styled.div`
  max-width: 800px;
  width: 90%;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

// Search input
const Search = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
`;

// Recipe card
const Card = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 6px;
`;

const Img = styled.img`
  width: 120px;
  height: 90px;
  object-fit: cover;
  margin-right: 1rem;
`;

const CardInfo = styled.div`
  flex: 1;
`;

const CardTitle = styled.h3`
  margin: 0 0 0.3rem 0;
`;

const CardCategory = styled.p`
  margin: 0 0 0.5rem 0;
`;

const BtnYellow = styled.button`
  background: yellow;
  color: black;
  border: none;
  padding: 5px 10px;
  margin-right: 6px;
  cursor: pointer;
`;

const BtnRed = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await api.get('/recipes');
        setRecipes(response.data);
      } catch (err) {
        console.error(err);
        toast.error('Erreur lors du chargement des recettes');
      }
    };
    fetchRecipes();
  }, []);

  const remove = async (id) => {
    try {
      await api.delete(`/recipes/${id}`);
      setRecipes(recipes.filter(res => res.id !== id));
      toast.success('Recette supprimée avec succès !');
    } catch (err) {
      console.error(err);
      toast.error('Erreur lors de la suppression de la recette');
    }
  };

  const filtered = recipes.filter(res =>
    res.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageWrapper>
      <Container>
        <h2>Liste des recettes</h2>
        <Search
          placeholder="Rechercher des recettes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {filtered.map(res => (
          <Card key={res.id}>
            <Img src={res.imageUrl} />
            <CardInfo>
              <CardTitle>{res.name}</CardTitle>
              <CardCategory>{res.category}</CardCategory>
              <BtnYellow onClick={() => navigate(`/edit/${res.id}`)}>Modifier</BtnYellow>
              <BtnRed onClick={() => remove(res.id)}>Supprimer</BtnRed>
            </CardInfo>
          </Card>
        ))}
      </Container>
    </PageWrapper>
  );
}
