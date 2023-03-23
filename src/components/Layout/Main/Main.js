import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useUser } from '../../../context/UserContext.js';
import Auth from '../../Pages/Auth/Auth.js';
import Home from '../../Pages/Home/Home.js';
import Profile from '../../Pages/Profile/Profile.js';
import ExploreRecipes from '../../Pages/Recipes/ExploreRecipes/ExploreRecipes.js';
import RecipeForm from '../../Pages/Recipes/RecipeForm/RecipeForm.js';
const loadingIcon = require('../../../assets/images/ezgif-menu.gif');

export default function Main() {
  const { user, loading } = useUser();
  return (
    <main
      style={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      {loading ? (
        <img src={loadingIcon} alt="loading icon" />
      ) : (
        <Routes>
          <Route path="/auth/:type" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/recipe-editor" element={<RecipeForm />} />
          <Route path="/user-profile" element={<Profile />} />
          <Route path="/explore-recipes" element={<ExploreRecipes />} />
          <Route path="/" element={user ? <Home /> : <Navigate to="/auth/sign-in" />} />
        </Routes>
      )}
    </main>
  );
}
