import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from '../containers/navBar';
import PrivateRoutes from '../components/PrivateRoutes';
import HomePage from './users/HomePage';
import ShowAnimePage from './users/showAnimePage';
import UserFavouritePage from './users/userFavouritePage';

export default function UserPage() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="animes/:id" element={<ShowAnimePage />} />
        <Route path="users/:id/favourite" element={<PrivateRoutes type="user"><UserFavouritePage /></PrivateRoutes>} />
      </Routes>
    </div>
  );
}
