import {
  SET_MESSAGE, CLEAR_MESSAGE, SET_MESSAGE_ARRAY, ANIME_SUCCESS,
} from '../actions/type';

const initialState = { };

export default function message(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { ...initialState, message: payload };
    case SET_MESSAGE_ARRAY:
      return { ...initialState, message: payload };
    case ANIME_SUCCESS:
      return { success: 'Anime action succesful' };
    case CLEAR_MESSAGE:
      return { ...initialState, message: '' };

    default:
      return state;
  }
}
