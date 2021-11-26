/* eslint-disable camelcase */
import { toast } from 'react-toastify';
import {
  GET_ADMIN_ANIME, GET_ADMIN_USER, SET_MESSAGE, MAKE_USER_ADMIN, DELETE_ANIME_ADMIN,
  REMOVE_USER_ADMIN, DELETE_USER_ADMIN, SET_MESSAGE_ARRAY, ANIME_SUCCESS,
} from './type';
import userServices from '../../auth/users.service';

export const adminAnime = () => (dispatch) => userServices.getAdminAnime().then((response) => {
  dispatch({
    type: GET_ADMIN_ANIME,
    payload: { animes: response.data },
  });

  return Promise.resolve();
},
(error) => {
  const message = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();

  dispatch({
    type: SET_MESSAGE,
    payload: message,
  });

  return Promise.reject();
});

export const adminUsers = () => (dispatch) => userServices.getAdminboard().then((response) => {
  dispatch({
    type: GET_ADMIN_USER,
    payload: { users: response.data },
  });

  return Promise.resolve();
},
(error) => {
  const message = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();

  dispatch({
    type: SET_MESSAGE,
    payload: message,
  });

  return Promise.reject();
});

export const makeUsersAdmin = (id) => (dispatch) => userServices.makeUserAdmin(id)
  .then((response) => {
    dispatch({
      type: MAKE_USER_ADMIN,
      payload: { user: response.data, id },
    });
    toast.success(`user ${id} has been made an admin`);
    return Promise.resolve();
  },
  (error) => {
    const message = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();
    toast.error(message);
    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    return Promise.reject();
  });

export const removeUsersAdmin = (id) => (dispatch) => userServices.removeUserAdmin(id)
  .then((response) => {
    dispatch({
      type: REMOVE_USER_ADMIN,
      payload: { user: response.data, id },
    });
    toast.success(`user ${id} is no longer an admin`);
    return Promise.resolve();
  },
  (error) => {
    const message = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();
    toast.error(message);
    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    return Promise.reject();
  });

export const deleteUsers = (id) => (dispatch) => userServices.destroyAdminUsers(id)
  .then((response) => {
    dispatch({
      type: DELETE_USER_ADMIN,
      payload: { user: response.data, id },
    });
    toast.success('User deleted');
    return Promise.resolve();
  },
  (error) => {
    const message = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();
    toast.error('Error deleting user');
    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    return Promise.reject();
  });

export const deleteAnime = (id) => (dispatch) => userServices.destroyAdminAnime(id)
  .then((response) => {
    dispatch({
      type: DELETE_ANIME_ADMIN,
      payload: { anime: response.data, id },
    });
    toast.success('Anime deleted');
    return Promise.resolve();
  },
  (error) => {
    const message = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();
    toast.error(message);
    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    return Promise.reject();
  });

export const CreateAnime = (name, description,
  rating, header_image, genre_list) => (dispatch) => userServices
  .postAdminAnime(name, description, rating, header_image, genre_list)
  .then((response) => {
    dispatch({
      type: ANIME_SUCCESS,
      payload: { user: response.data },
    });
    toast.success('Anime created');
    return Promise.resolve();
  },
  (error) => {
    const message = (error.response
            && error.response.data
            && error.response.data.message)
          || error.response.data
          || error.message
          || error.toString();
    toast.error('There are some errors creating Anime');
    dispatch({
      type: error.response.data ? SET_MESSAGE_ARRAY : SET_MESSAGE,
      payload: message,
    });

    return Promise.reject();
  });

export const UpdateAnime = (name, description,
  rating, genre_list, animeId) => (dispatch) => userServices
  .updateAdminAnime(name, description, rating, genre_list, animeId)
  .then((response) => {
    dispatch({
      type: ANIME_SUCCESS,
      payload: { user: response.data },
    });
    toast.success('Anime Updated');
    return Promise.resolve();
  },
  (error) => {
    const message = (error.response
              && error.response.data
              && error.response.data.message)
            || error.response.data
            || error.message
            || error.toString();
    toast.error('There are some errors updating Anime');
    dispatch({
      type: error.response.data ? SET_MESSAGE_ARRAY : SET_MESSAGE,
      payload: message,
    });

    return Promise.reject();
  });
