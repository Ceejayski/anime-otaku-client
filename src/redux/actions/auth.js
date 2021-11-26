import {
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  SET_MESSAGE_ARRAY,
} from './type';

import AuthService from '../../auth/auth.services';

export const register = (username, email,
  password) => (dispatch) => AuthService.register({
  username, email, password, password_confirmation: password,
}).then(
  (response) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: response },
    });

    dispatch({
      type: SET_MESSAGE,
      payload: response.data.message,
    });
    return Promise.resolve();
  },
  (error) => {
    const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.response.data
        || error.message
        || error.toString();

    dispatch({
      type: REGISTER_FAIL,
    });

    dispatch({
      type: error.response.data ? SET_MESSAGE_ARRAY : SET_MESSAGE,
      payload: message,
    });

    return Promise.reject();
  },
);

export const login = (email, password) => (dispatch) => AuthService.login(email, password).then(
  (data) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: data },
    });

    return Promise.resolve();
  },
  (error) => {
    console.log(error.response);
    const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.response.data.error.user_authentication
        || error.message
        || error.toString();

    dispatch({
      type: LOGIN_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    return Promise.reject();
  },
);

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
