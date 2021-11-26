import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import AdminNavBar from '../components/adminNavbar';
import AdminSideBar from '../components/adminSideBar';
import AnimePage from './admin/animePage';
import AnimeShowPage from './admin/animeShowPage';
import AnimeUpdatePage from './admin/animeUpdatePage';
import NewAnimePage from './admin/newAnimePage';
import UsersPage from './admin/usersPage';

export default function AdminPage() {
  return (
    <div>
      <AdminNavBar />
      <div className="row gx-1">
        <div className="col-2">
          <AdminSideBar />
        </div>
        <div className="col-10">
          <Container style={{ paddingTop: '20px' }}>
            <Routes>
              <Route exact path="/" element={<UsersPage />} />
              <Route path="/anime" element={<AnimePage />} />
              <Route path="animes/:id" element={<AnimeShowPage />} />
              <Route path="animes/new" element={<NewAnimePage />} />
              <Route path="animes/:id/update" element={<AnimeUpdatePage />} />
            </Routes>
          </Container>
        </div>
      </div>
    </div>
  );
}
