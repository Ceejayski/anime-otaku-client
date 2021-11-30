const authHeader = (type = 'user') => {
  const user = type === 'user' ? JSON.parse(localStorage.getItem('user')) : JSON.parse(localStorage.getItem('admin'));

  if (user && user.auth_token) {
    return { Authorization: `Bearer ${user.auth_token}` };
  }
  return {};
};

export default authHeader;
