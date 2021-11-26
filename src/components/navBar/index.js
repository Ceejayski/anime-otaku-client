import React, { useState } from 'react';
import {
  Button,
  Container, Nav, Navbar,
} from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../../assets/images/logo.png';
// import { logout } from '../../redux/actions/auth';
import AuthService from '../../auth/auth.services';
import PhoneSideBar from '../phoneSidebar';

function NavBar(props) {
  const { isLoggedIn, user } = props;
  const [scroll, setScroll] = useState(false);
  const [hidden, setHidden] = useState(true);
  const dispatch = useDispatch();
  const changeBackground = () => {
    if (window.scrollY > 100) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  window.addEventListener('scroll', changeBackground);
  return (
    <header>
      <Navbar expand="md" fixed="top" className={!scroll ? 'transparent text-white px-3 d-md-block d-none' : 'bg-light text-dark px-3 d-md-block d-none'}>
        <Container className="text-white px-3">

          <Link to="/" className="brand navbar-brand ms-3">
            <img
              src={Logo}
              alt="logo"
              height="60"
              className="d-inline-block align-top"
            />
            <span className="ms-1 h5 ceviche" style={{ lineHeight: '60px', color: '#EC5200', fontSize: '1.4em' }}>
              OTAKU
            </span>

          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="mx-auto w-50" />
            <Nav className="me-3">
              {isLoggedIn ? (
                <>
                  <p className="mb-0 nav-link">{user.username}</p>
                  <Link to={`/users/${user.id}/favourite`} className="nav-link">Favourites</Link>
                  { user.admin && (
                    <>
                      <Link to="/admin" className="nav-link">Admin Page</Link>
                    </>
                  ) }
                  <Button
                    onClick={() => {
                      AuthService.logout();

                      dispatch({
                        type: 'LOGOUT',
                      });
                    }}
                    className="nav-btn nav-link"
                  >
                    {' '}
                    Logout

                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">Login</Link>
                  <Link to="/signup" className="nav-link">Signup</Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <nav className="d-md-none second-nav fixed-top">
        <div hidden={hidden}>
          <PhoneSideBar handleClick={(val) => setHidden(val)} />
        </div>
        <div className="d-flex">

          <button type="button" aria-label="toggle" className="btn" style={{ border: 0, outline: 'none' }} onClick={() => setHidden(!hidden)}><i className="fas fa-bars" /></button>
          <div className="sm-nav-brand ms-3">
            <Link to="/">
              <img
                src={Logo}
                alt="logo"
                height="50"
                className="d-inline-block align-top"
              />
              <span className="ms-1 h5 ceviche" style={{ lineHeight: '50px', color: '#EC5200', fontSize: '1.4em' }}>
                OTAKU
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

NavBar.defaultProps = {
  user: null,
};

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.shape(),
};

const mapStateToProps = (state) => {
  const { isLoggedIn, user } = state.auth;
  return {
    isLoggedIn,
    user,
  };
};

export default connect(mapStateToProps)(NavBar);
