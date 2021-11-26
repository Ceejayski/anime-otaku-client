/* eslint-disable quote-props */
/* eslint-disable camelcase */
import axios from 'axios';
import authHeader from './auth.headers';

const API_URL = 'https://anime-otaku-rails.herokuapp.com/api/v1/';

const getPublicContent = () => axios.get(`${API_URL}houses`);

const getUserboard = (userId) => (
  axios.get(`${API_URL}users/${userId}/favourites`, { headers: authHeader() })
);
const getUserAnime = () => (
  axios.get(`${API_URL}animes`)
);
const showUserAnime = (userId) => (
  axios.get(`${API_URL}animes/${userId}`)
);

const getAdminboard = async () => {
  const response = await axios.get(`${API_URL}admin/users`, { headers: authHeader('admin') });
  return response.data;
};

const destroyAdminUsers = async (userId) => {
  const response = await axios({
    method: 'delete',
    url: `${API_URL}admin/users/${userId}`,
    headers: authHeader('admin'),
  });
  return response.data;
};

const getAdminAnime = async () => {
  const response = await axios.get(`${API_URL}admin/animes`, { headers: authHeader('admin') });
  return response.data;
};

const makeUserAdmin = async (userId) => {
  const response = await axios.patch(`${API_URL}admin/make_admin/${userId}`, null, { headers: authHeader('admin') });
  return response.data;
};

const removeUserAdmin = async (userId) => {
  const response = await axios.patch(`${API_URL}admin/remove_admin/${userId}`, null, { headers: authHeader('admin') });
  return response.data;
};

const postAdminAnime = async (
  name, description, rating, header_image, genre_list,
) => {
  const admin = JSON.parse(localStorage.getItem('admin'));
  const headers = { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${admin.auth_token}` };
  const data = new FormData();
  data.append('name', name);
  data.append('description', description);
  data.append('rating', rating);
  data.append('genre_list', genre_list);
  data.append('header_image', header_image);
  const response = await axios.post('https://anime-otaku-rails.herokuapp.com/api/v1/admin/animes', data, { headers });
  return response.data;
};

const updateAdminAnime = async (
  name, description, rating, genre_list, animeId,
) => {
  const body = {
    name, description, rating, genre_list,
  };
  const response = await axios.patch(`${API_URL}admin/animes/${animeId}`, body, { headers: authHeader('admin') });
  return response.data;
};

const destroyAdminAnime = async (animeId) => {
  const response = await axios({
    method: 'delete',
    url: `${API_URL}admin/animes/${animeId}`,
    headers: authHeader('admin'),
  });
  return response.data;
};

const getUserfavourites = async (userId) => {
  const response = await axios
    .get(`${API_URL}users/${userId}/favourites`,
      { headers: authHeader() });
  return response.data;
};

const addUserfavourite = async (houseId) => {
  const response = await axios
    .post(`${API_URL}animes/${houseId}/favourites`,
      { headers: authHeader() });

  return response.data;
};

const removeUserfavourite = async (userId, houseId) => {
  const favourites = await getUserfavourites(userId);
  const favourite = favourites.find((favourite) => favourite.house_id === houseId);
  const response = await axios({
    method: 'delete',
    url: `${API_URL}animes/${houseId}/favourites/${favourite.id}`,
    headers: authHeader(),
  });

  return response.data;
};

const userServices = {
  getPublicContent,
  getUserboard,
  getUserfavourites,
  addUserfavourite,
  removeUserfavourite,
  getAdminboard,
  destroyAdminUsers,
  getAdminAnime,
  makeUserAdmin,
  removeUserAdmin,
  postAdminAnime,
  updateAdminAnime,
  destroyAdminAnime,
  getUserAnime,
  showUserAnime,
};

export default userServices;
