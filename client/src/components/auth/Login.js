import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import InputFieldset from '../common/InputFieldset';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errors: {}
    };
    this.onChange = this.changeHandler.bind(this);
    this.onSubmit = this.submitHandler.bind(this);
  }

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/profile-basic');
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/profile-basic');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <main className="container-fluid">
        <div className="row">
          <div className="auth-form">
            <h2 className="text-white">My Network</h2>
            <div className="form-wrapper">
              <form onSubmit={this.submitHandler}>
                <InputFieldset
                  name="username"
                  value={this.state.username}
                  onChange={this.changeHandler}
                  placeholder="Username"
                  error={errors.username}
                />
                <InputFieldset
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.changeHandler}
                  placeholder="Password"
                  error={errors.password}
                />
                <button type="submit" className="btn btn-dark">
                  Login
                </button>
              </form>
            </div>
            <p>
              Not on My Network yet?{' '}
              <Link to="/" className="font-weight-bold">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </main>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
