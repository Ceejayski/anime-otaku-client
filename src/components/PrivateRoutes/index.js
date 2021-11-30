import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function PrivateRoutes({ children, type }) {
  const auth = localStorage.getItem(type);
  return auth ? children : <Navigate to="/login" />;
}

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
};
