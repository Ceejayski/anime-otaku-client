import {
  GET_ADMIN_ANIME, GET_ADMIN_USER, REMOVE_USER_ADMIN,
  MAKE_USER_ADMIN, DELETE_USER_ADMIN, DELETE_ANIME_ADMIN,
} from '../actions/type';
import {
  handleMakeAdmin, HandleRemoveAdmin, handleUserDelete, handleAnimeDelete,
} from '../utils/action.utils';

const initialState = {
  animes: [],
  users: [],
};
const AdminReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ADMIN_ANIME:
      return {
        ...state,
        animes: payload.animes,
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
