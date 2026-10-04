import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { AuthContext } from '../components/AuthContext.js';
import api from '../api';

const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #f5f5f5;
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 800px;
  width: 90%;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Search = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
`;

const AddButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 10px 14px;
  margin-bottom: 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;

const LogoutButton = styled.button`
  background: #333;
  color: white;
  border: none;
  padding: 10px 14px;
  margin-left: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;

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

const ViewButton = styled.button`
  background: #0d6efd;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-right: 6px;
  cursor: pointer;
`;

const EditButton = styled.button`
  background: #ffc107;
  color: black;
  border: none;
  padding: 5px 10px;
  margin-right: 6px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

export default function RecipeList() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await api.get('/recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error loading recipes:', error);
        toast.error('Unable to load recipes');
      }
    };

    fetchRecipes();
  }, []);

  const removeRecipe = async (id) => {
    try {
      await api.delete(`/recipes/${id}`);
      setRecipes((currentRecipes) =>
        currentRecipes.filter((recipe) => recipe.id !== id)
      );
      toast.success('Recipe deleted successfully!');
    } catch (error) {
      console.error('Error deleting recipe:', error);
      toast.error('Unable to delete recipe');
    }
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <PageWrapper>
      <Container>
        <h2>Recipes</h2>

        <AddButton onClick={() => navigate('/add')}>
          Add Recipe
        </AddButton>

        <LogoutButton onClick={handleLogout}>
          Log Out
        </LogoutButton>

        <Search
          placeholder="Search recipes..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        {filteredRecipes.map((recipe) => (
          <Card key={recipe.id}>
            {recipe.imageUrl && <Img src={recipe.imageUrl} alt={recipe.name} />}

            <CardInfo>
              <CardTitle>{recipe.name}</CardTitle>
              <CardCategory>{recipe.category}</CardCategory>

              <ViewButton onClick={() => navigate(`/recipe/${recipe.id}`)}>
                View Details
              </ViewButton>

              {recipe.User?.username === user?.username && (
                <>
                  <EditButton onClick={() => navigate(`/edit/${recipe.id}`)}>
                    Edit
                  </EditButton>

                  <DeleteButton onClick={() => removeRecipe(recipe.id)}>
                    Delete
                  </DeleteButton>
                </>
              )}
            </CardInfo>
          </Card>
        ))}
      </Container>
    </PageWrapper>
  );
}
