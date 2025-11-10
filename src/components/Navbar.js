// Navbar.js
// This is the top navigation bar component of the application
import { useContext } from 'react'; // Importing React and useContext from React
import { Link, useNavigate } from 'react-router-dom'; // Importing Link and useNavigate from react-router-dom
import styled from 'styled-components'; // Importing styled-components for styling
import { AuthContext } from './authContext.jsx'; // Importing AuthContext for authentication state management

// Styled components for the navigation bar
// Using CSS inside javascript to style the navigation bar
// styled.nav creates a component that renders a <nav> element
// We are setting a horizontal flex container, spacing between left and right children, vertical centering, padding, white backrgound and a bottom border
const Nav = styled.nav` 
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #ffffff;
    border-bottom: 1px solid #ccc;
`;

// styles.div creates a component that renders a <div> element
// We are setting a horizontal flex container, spacing between left and right children
const NavLinks = styled.div`
    display: flex;
    gap: 1rem;
`;

// styled.button creates a component that renders a <button> element
// We are setting a padding, cursor, color and background color
const Button = styled.button`
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
    color: white;
    background-color: ${(props) => props.color || 'blue'};
`;

const Navbar = () => {
    const { user, logout } = useContext(AuthContext); // We are destructuring user and logout from the AuthContext
    const navigate = useNavigate(); // Using useNavigate to navigate between pages

    const handleLogout = () => { // handleLogout function is called when the logout button is clicked
        logout(); // Calling the logout function to log out the user
        navigate('/login'); // Navigating to the login page after logout
    };

    // JSX rendering
    return (
        <Nav> {/* Wraps everything in a <nav> element */ }
            <Link to="/recipes">Recette App</Link> {/* Link renders an <*> element with an href */}
            <NavLinks>
                {!user && (
                    <> {/* <> </> is a React fragment to group multiple children without adding extra DOM nodes */}
                      <Link to="/login">Connexion</Link>
                      <Link to="/signup">Inscription</Link>
                    </>
                )}
                {user && (
                    <>
                      <Link to="/recipes">Recettes</Link>
                      <Link to="/add-recipe">Ajouter recettes</Link>
                      <Button color="red" onClick={handleLogout}>Se déconnecter</Button>
                    </>
                )}
            </NavLinks>
        </Nav>
    );
};

export default Navbar; // Exporting the Navbar component

// End of Navbar.js

