# Recipe Management Frontend 🍳

## Overview

A React frontend for a full-stack recipe management application built as part of my web development program and later revisited for portfolio use.

Users can create an account, authenticate with JWT, browse and search recipes, view recipe details, and manage recipes they own.

The application communicates with a Node.js / Express REST API backed by MySQL.

## Live Application

https://recipe-project-frontend-vbr6.onrender.com

## Backend Repository

https://github.com/jeffsawma/recipe-project-backend

## Features

- User registration and login
- JWT-based authentication
- Protected application routes
- Recipe search
- Recipe detail view
- Add recipes
- Edit owned recipes
- Delete owned recipes
- Ownership-based controls
- Logout functionality
- Automatic redirection for unauthenticated users
- Toast notifications for application feedback

## Tech Stack

- React
- React Router
- Axios
- React Context
- Styled Components
- React Toastify
- Vite
- Render

## Application Routes

### Public Routes

| Route | Description |
| --- | --- |
| `/` | Redirects to login |
| `/login` | User login |
| `/signup` | User registration |

### Protected Routes

| Route | Description |
| --- | --- |
| `/recipes` | Browse and search recipes |
| `/recipe/:id` | View recipe details |
| `/add` | Create a recipe |
| `/edit/:id` | Edit an owned recipe |

Authentication-protected pages are handled through a custom `PrivateRoute` component.

## Authentication

Authentication state is managed with React Context.

After a successful login:

- the JWT is stored in `localStorage`
- the authenticated username is stored locally
- Axios automatically includes the JWT in protected API requests
- unauthenticated users are redirected to the login page

Recipe ownership determines whether edit and delete controls are displayed.

## Demo Account

The deployed application can be tested with:

```text
Username: Tester
Password: 0000
```

## Backend API

API communication is centralized through an Axios instance in `src/api.js`.

The API URL is configured through the `VITE_API_URL` environment variable.

Example:

```env
VITE_API_URL=http://localhost:3000
```

For the deployed application, this variable points to the hosted backend API.

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/jeffsawma/recipe-project-frontend.git
cd recipe-project-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the environment

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

For a backend running locally:

```env
VITE_API_URL=http://localhost:3000
```

### 4. Start the development server

```bash
npm run dev
```

## Available Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Project Structure

```text
src/
├── components/
│   ├── AuthContext.js
│   ├── AuthProvider.jsx
│   └── PrivateRoute.jsx
├── pages/
│   ├── AddRecipe.jsx
│   ├── EditRecipe.jsx
│   ├── Login.jsx
│   ├── RecipeDetail.jsx
│   ├── RecipeList.jsx
│   └── SignUp.jsx
├── api.js
├── App.jsx
├── index.css
└── main.jsx
```

## Project History

This application was originally developed during my web development program.

I later revisited the project to improve dependency security, environment configuration, authentication structure, routing, code organization, deployment reliability, and overall portfolio presentation.

## Screenshots

### Login

![Login](./screenshots/login.png)

### Recipe List

![Recipes](./screenshots/recipes.png)

### Add Recipe

![Add Recipe](./screenshots/add.png)

### Edit Recipe

![Edit Recipe](./screenshots/edit.png)
