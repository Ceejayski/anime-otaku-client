import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';

export default function AdminNavBar() {
  // const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <Navbar bg="light">
        <Container>
          <Link to="/" className="brand navbar-brand ms-3">
            <img
              src={Logo}
              alt="logo"
              height="40"
              className="d-inline-block align-top"
            />
            <span className="ms-1 h5 ceviche" style={{ lineHeight: '40px', color: '#EC5200', fontSize: '1.4em' }}>
              OTAKU
            </span>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="mx-auto w-50" />
            {/* <Nav className="me-3">
              {user.user !== null && (

              <p className="mb-0 nav-link">{user.user.username}</p>
              )}
            </Nav> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
