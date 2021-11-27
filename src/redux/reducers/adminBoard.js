import {
  GET_ADMIN_ANIME,
  GET_ADMIN_USER,
  REMOVE_USER_ADMIN,
  GET_USER_ANIME,
  MAKE_USER_ADMIN,
  DELETE_USER_ADMIN,
  DELETE_ANIME_ADMIN,
  GET_USER_FAVORITE,
  ADD_USER_FAVORITE,
  REMOVE_USER_FAVORITE,
} from '../actions/type';
import {
  handleMakeAdmin,
  HandleRemoveAdmin,
  handleUserDelete,
  handleAnimeDelete,
  handleRemoveFave,
} from '../utils/action.utils';

const initialState = {
  animes: [],
  users: [],
  usersAnime: [],
  favorites: [],
};
const AdminReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ADMIN_ANIME:
      return {
        ...state,
        animes: payload.animes,
      };
    case GET_USER_ANIME:
      return {
        ...state,
        usersAnime: payload.animes,
      };
    case GET_USER_FAVORITE:
      return {
        ...state,
        favorites: payload.animes,
      };
    case ADD_USER_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.concat(payload.anime),
      };
    case REMOVE_USER_FAVORITE:
      return {
        ...state,
        favorites: handleRemoveFave({ current: state.favorites, Fave: payload.anime }),
      };
    case GET_ADMIN_USER:
      return {
        ...state,
        users: payload.users,
      };
    case MAKE_USER_ADMIN:
      return {
        ...state,
        users: handleMakeAdmin({ id: payload.id, users: state.users }),
      };
    case REMOVE_USER_ADMIN:
      return {
        ...state,
        users: HandleRemoveAdmin({ id: payload.id, users: state.users }),
      };
    case DELETE_USER_ADMIN:
      return {
        ...state,
        users: handleUserDelete({ id: payload.id, users: state.users }),
      };
    case DELETE_ANIME_ADMIN:
      return {
        ...state,
        animes: handleAnimeDelete({ id: payload.id, animes: state.animes }),
      };
    default:
      return state;
  }
};

export default AdminReducer;
