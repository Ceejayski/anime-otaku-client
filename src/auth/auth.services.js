/* eslint-disable camelcase */
import axios from 'axios';

const API_URL = 'https://anime-otaku-rails.herokuapp.com/api/v1/';

const login = async (email, password) => {
  const response = await axios
    .post(`${API_URL}login`, {
      email,
      password,
    });
  if (response.data.admin) {
    localStorage.setItem('admin', JSON.stringify(response.data));
    localStorage.setItem('user', JSON.stringify(response.data));
  } else if (!response.data.admin) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('admin');
};

const register = async ({
  username, email, password, password_confirmation,
}) => {
  const response = await axios
    .post(`${API_URL}sign_up`, {
      data: {
        attributes: {
          username,
          email,
          password,
          password_confirmation,
        },
      },
    });
  if (response.data.auth_token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const AuthService = {
  login,
  register,
  logout,
};

export default AuthService;
