/* eslint-disable camelcase */
import axios from 'axios';
import authHeader from './auth.headers';

const API_URL = 'https://anime-otaku-rails.herokuapp.com/api/v1/';

const getPublicContent = () => axios.get(`${API_URL}houses`);

const getUserboard = (userId) => (
  axios.get(`${API_URL}users/${userId}/favourites`, { headers: authHeader() })
);

const getAdminboard = () => (
  axios.get(`${API_URL}admin/users`, { headers: authHeader('admin') })
);

const destroyAdminUsers = async (userId) => {
  const response = await axios({
    method: 'delete',
    url: `${API_URL}admin/users/${userId}`,
    headers: authHeader('admin'),
  });
  return response.data;
};

const getAdminAnime = () => (
  axios.get(`${API_URL}admin/animes`, { headers: authHeader('admin') })
);

const makeUserAdmin = (userId) => (
  axios.patch(`${API_URL}admin/make_admin/${userId}`, { headers: authHeader('admin') })
);

const removeUserAdmin = (userId) => (
  axios.patch(`${API_URL}admin/remove_admin/${userId}`, { headers: authHeader('admin') })
);

const postAdminAnime = async ({
  name, description, rating, header_image, genre_list,
}) => {
  const body = {
    data: {
      attributes: {
        name, description, rating, header_image, genre_list,
      },
    },
  };
  const response = await axios.post(`${API_URL}admin/animes`, body, { headers: authHeader('admin') });
  return response.data;
};

const updateAdminAnime = async ({
  name, description, rating, header_image, genre_list, animeId,
}) => {
  const body = {
    data: {
      attributes: {
        name, description, rating, header_image, genre_list,
      },
    },
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
};

export default userServices;
