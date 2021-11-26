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
  return (
    <div className="phone-sidebar">
      <ProSidebar>
        <SidebarHeader>
          <div className="logotext ms-3 mt-2 d-flex justify-content-between align-items-center" style={{ textTransform: 'capitalize' }}>
            {/* small and big change using menucollapse state */}
            <p className="mb-0">{isLoggedIn ? user.username : 'AnimeOtaku'}</p>
            <button type="button" aria-label="toggle" className="btn" style={{ border: 0, outline: 'none' }} onClick={() => handleClick(true)}><i className="fas fa-bars" /></button>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu>
            <MenuItem>
              <Link to="/" className="w-100">
                Home
              </Link>
            </MenuItem>
            { !isLoggedIn && (
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
            { isLoggedIn && (
              <>
                { user.admin && (
                <MenuItem>
                  <Link to="/admin" className="w-100">
                    Admin Dashboard
                  </Link>
                </MenuItem>
                ) }
                <MenuItem><Link to={`/users/${user.id}/favourite`} className="w-100">Favourite </Link></MenuItem>
              </>
            )}

          </Menu>
        </SidebarContent>
        { isLoggedIn && (
          <SidebarFooter>

            <Menu>
              <>
                <Button
                  className="footer-btn"
                  onClick={() => {
                    AuthService.logout();

                    dispatch({
                      type: 'LOGOUT',
                    });
                  }}
                >
                  <MenuItem>Logout</MenuItem>
                </Button>
              </>
            </Menu>
          </SidebarFooter>
        ) }
      </ProSidebar>
    </div>
  );
}

PhoneSideBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
