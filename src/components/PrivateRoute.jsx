// PrivateRoute.js
// This is a route guard for protected routes that requires authentication to access
// PrivateRoute.js
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './authContext.jsx';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return null; // Or a loading spinner

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;

// End of PrivateRoute.js
