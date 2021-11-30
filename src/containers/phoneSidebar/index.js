import React from 'react';
import { Button } from 'react-bootstrap';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthService from '../../auth/auth.services';
import 'react-pro-sidebar/dist/css/styles.css';
import './style.scss';

export default function PhoneSideBar({ handleClick }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const favorites = useSelector((state) => state.adminboard.favorites);
  return (
    <div className="phone-sidebar">
      <ProSidebar>
        <SidebarHeader>
          <div
            className="logotext ms-3 mt-2 d-flex justify-content-between align-items-center"
            style={{ textTransform: 'capitalize' }}
          >
            <p className="mb-0">{isLoggedIn ? user.username : 'AnimeOtaku'}</p>
            <button
              type="button"
              aria-label="toggle"
              className="btn"
              style={{ border: 0, outline: 'none' }}
              onClick={() => handleClick(true)}
            >
              <i className="fas fa-bars" />
            </button>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu>
            <MenuItem>
              <Link to="/" className="w-100">
                Home
              </Link>
            </MenuItem>
            {!isLoggedIn && (
              <>
                <MenuItem>
                  <Link to="/signup" className="w-100">
                    Sign up
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/login" className="w-100">
                    Login
                  </Link>
                </MenuItem>
              </>
            )}
            {isLoggedIn && (
              <>
                {user.admin && (
                  <MenuItem>
                    <Link to="/admin" className="w-100">
                      Admin Dashboard
                    </Link>
                  </MenuItem>
                )}
                <MenuItem>

                  <Link to={`/users/${user.id}/favourite`} className="w-100">
                    Favorites
                    {' '}
                  </Link>
                  <div className="badge rounded-pill bg-danger ms-4">
                    {favorites.length}
                    <span className="visually-hidden">unread messages</span>
                  </div>
                </MenuItem>
              </>
            )}
          </Menu>
        </SidebarContent>
        {isLoggedIn && (
          <SidebarFooter>
            <Menu>
              <>
                <Button
                  className="footer-btn"
                  onClick={() => {
                    AuthService.logout();
                    toast.success('Logged out successfully');
                    dispatch({
                      type: 'LOGOUT',
                    });
                    handleClick(true);
                  }}
                >
                  <MenuItem>Logout</MenuItem>
                </Button>
              </>
            </Menu>
          </SidebarFooter>
        )}
      </ProSidebar>
    </div>
  );
}

PhoneSideBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
