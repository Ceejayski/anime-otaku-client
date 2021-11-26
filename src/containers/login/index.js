/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';

import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { login } from '../../redux/actions/auth';
import './style.css';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
  return undefined;
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: '',
      password: '',
      loading: false,
    };
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });
    const { password, email } = this.state;
    this.form.validateAll();

    const { dispatch } = this.props;
    if (this.checkBtn.context._errors.length === 0) {
      dispatch(login(email, password))
        .then(() => {
          window.location.reload();
        })
        .catch(() => {
          this.setState({
            loading: false,
          });
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  render() {
    const { isLoggedIn, message, dispatch } = this.props;
    const { password, email, loading } = this.state;
    if (isLoggedIn) {
      return <Navigate to="/" />;
    }

    return (
      <Container className="background-overlay">
        <div className="d-flex justify-content-center align-items-center w-100 mb-auto" style={{ height: '100vh', marginTop: '-40px' }}>

          <div className=" border-0 w-100" style={{ maxWidth: '300px' }}>
            <h4 className="text-center">Login</h4>
            <p className="text-center">Hey there, Sign in and we take it up from there</p>
            <Form
              onSubmit={this.handleLogin}
              ref={(c) => {
                this.form = c;
              }}
              className="w-100 mb-5"
            >
              <div className="form-group mb-4">
                <Input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  placeholder="Email"
                  style={{ borderRadius: '25px' }}
                  onChange={this.onChangeEmail}
                  validations={[required]}
                />
              </div>

              <div className="form-group mb-4">
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={password}
                  style={{ borderRadius: '25px' }}
                  onChange={this.onChangePassword}
                  validations={[required]}
                />
              </div>

              <div className="form-group text-center">
                <button
                  className="btn btn-primary btn-block btn-lg border-0"
                  disabled={loading}
                  type="submit"
                  style={{ borderRadius: '25px', backgroundColor: '#FF5617' }}
                >
                  {loading && (
                  <span className="spinner-border spinner-border-sm" />
                  )}
                  <span>Login</span>
                </button>
              </div>

              {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                  {console.log(message)}
                </div>
              </div>
              )}
              <CheckButton
                style={{ display: 'none' }}
                ref={(c) => {
                  this.checkBtn = c;
                }}
              />
            </Form>
            <p className="text-center">
              {' '}
              Register new Account?
              {' '}
              <Link to="/signup" onClick={() => dispatch({ type: 'CLEAR_MESSAGE' })}>Create Account</Link>
            </p>
          </div>
        </div>
      </Container>
    );
  }
}

Login.defaultProps = {
  message: undefined,
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message,
  };
}

export default connect(mapStateToProps)(Login);
