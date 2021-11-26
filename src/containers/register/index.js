/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { register } from '../../redux/actions/auth';
import './style.scss';

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

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
  return undefined;
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
  return undefined;
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
  return undefined;
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: '',
      email: '',
      password: '',
      successful: false,
    };
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          register(this.state.username, this.state.email, this.state.password),
        )
        .then(() => {
          this.setState({
            successful: true,
          });
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
        });
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
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
    if (isLoggedIn) {
      return <Navigate to="/" />;
    }

    return (
      <div className="register-background-overlay">
        <Container>
          <div className="d-flex justify-content-center align-items-center w-100 mb-auto" style={{ height: '100vh', marginTop: '-40px' }}>
            <div className=" border-0 w-100" style={{ maxWidth: '300px' }}>
              <h4 className="text-center">Sign Up</h4>
              <p className="text-center">Hey there, Sign up and we take it up from there</p>
              <Form
                onSubmit={this.handleRegister}
                autoComplete="off"
                ref={(c) => {
                  this.form = c;
                }}
                id="new-User"
                className="w-100 mb-5"
              >
                {!this.state.successful && (
                <div>
                  <div className="form-group">

                    <Input
                      type="text"
                      className="form-control mb-4"
                      name="username"
                      value={this.state.username}
                      style={{ borderRadius: '25px' }}
                      onChange={this.onChangeUsername}
                      autoComplete="new-user"
                      validations={[required, vusername]}
                      placeholder="Username"
                    />
                  </div>

                  <div className="form-group mb-4">

                    <Input
                      type="text"
                      className="form-control"
                      name="email"
                      value={this.state.email}
                      style={{ borderRadius: '25px' }}
                      autoComplete="new-email"
                      onChange={this.onChangeEmail}
                      validations={[required, email]}
                      placeholder="Email"
                    />
                  </div>

                  <div className="form-group mb-4">
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      value={this.state.password}
                      autoComplete="new-password"
                      style={{ borderRadius: '25px' }}
                      onChange={this.onChangePassword}
                      validations={[required, vpassword]}
                      placeholder="Password"
                    />
                  </div>

                  <div className="form-group text-center">
                    <button className="btn btn-primary btn-block btn-lg border-0" type="submit" style={{ borderRadius: '25px', backgroundColor: '#FF5617' }}>Sign Up</button>
                  </div>
                </div>
                )}

                {message && (
                <div className="form-group mt-2">
                  <div className={this.state.successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
                    {typeof (message) === 'string' ? (
                      <>
                        {' '}
                        {message}
                        {' '}
                      </>
                    ) : (
                      <>
                        {message.errors.map((err) => (
                          <div key={err.detail}>
                            <p className="mb-1">{err.detail}</p>
                          </div>
                        ))}
                      </>
                    )}

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
                Already have an account?
                {' '}
                <Link to="/login" onClick={() => dispatch({ type: 'CLEAR_MESSAGE' })}>Login</Link>
              </p>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

Register.defaultProps = {
  message: undefined,
};

Register.propTypes = {
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

export default connect(mapStateToProps)(Register);
