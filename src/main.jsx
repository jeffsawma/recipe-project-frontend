// src/main.jsx
// Entry point of the application code in React
// It's where React mounts the application into the DOM (the HTML page)
import React from 'react' // Import React library for building UI components
import ReactDOM from 'react-dom/client' // Import ReactDOM for client-side rendering
import App from './App.jsx' // Import the main App component
import { BrowserRouter } from 'react-router-dom' // Import BrowserRouter for routing capabilities
import { ToastContainer } from 'react-toastify' // Import ToastContainer for toast notifications
import 'react-toastify/dist/ReactToastify.css' // Import styles for toast notifications
import './index.css' // Import global styles from index.css

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/* Enable strict mode for better error handling */}
    <BrowserRouter>  {/* Allows navigation between different routes in the app without refreshing the page */}
    <App /> {/* Render the main App component where everything happens */}
    <ToastContainer /> {/* Render ToastContainer for toast notifications */}
    </BrowserRouter>
  </React.StrictMode>
);

// End of main.jsx
