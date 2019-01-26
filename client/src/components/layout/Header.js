import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Header extends Component {
  logoutHandler = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const userfullName = isAuthenticated
      ? user.name.first + ' ' + user.name.last
      : '';

    const authLinks = (
      <ul className="main-menu list-inline">
        <li className="list-inline-item list-item-user">
        <Link to={`/timeline-about/${user.id}`} className="header-link">
            {userfullName}
        </Link>
        </li>
        <li className="list-inline-item ">
          <a
            href=""
            onClick={this.logoutHandler.bind(this)}
            className="nav-link"
          >
            Logout
          </a>
        </li>
      </ul>
    );

    return (
      <header>
        <nav className="navbar navbar-default navbar-fixed-top menu">
          <div className="container">
            <div className="row">
              <div className="navbar-header">
                <Link className="navbar-brand" to="/">
                  <img src="/images/logo.png" alt="logo" />
                </Link>
              </div>
              <div className="navbar navbar-top-menu">
                {isAuthenticated ? authLinks : ''}
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Header);
