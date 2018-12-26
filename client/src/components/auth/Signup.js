import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupUser } from '../../actions/authActions';
import InputFieldset from '../common/InputFieldset';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      first: '',
      last: '',
      username: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.changeHandler.bind(this);
    this.onSubmit = this.submitHandler.bind(this);
  }

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/timeline-about');
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();

    const newUser = {
      name: {
        first: this.state.first,
        last: this.state.last
      },
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signupUser(newUser, this.props.history);
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
                  name="first"
                  value={this.state.first}
                  onChange={this.changeHandler}
                  placeholder="First name"
                  error={errors.first}
                />
                <InputFieldset
                  name="last"
                  value={this.state.last}
                  onChange={this.changeHandler}
                  placeholder="Last name"
                  error={errors.last}
                />
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
                <InputFieldset
                  type="password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.changeHandler}
                  placeholder="Confirmed password"
                  error={errors.password2}
                />
                <button type="submit" className="btn btn-dark">
                  Signup
                </button>
              </form>
            </div>
            <p>
              Already have an account?{' '}
              <Link to="/login" className="font-weight-bold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
    );
  }
}

Signup.propTypes = {
  signupUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { signupUser }
)(withRouter(Signup));
