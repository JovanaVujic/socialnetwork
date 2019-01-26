import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  deleteAccount
} from '../../actions/profileActions';

class ProfileActions extends Component {

  deleteHandler = () => {
    this.props.deleteAccount();
  };

  render() {
    const { user } = this.props.auth;
    const { profileExists, userid } = this.props;

    let actionsContent;

    //If profile does not exist show CREATE profile
    if (!profileExists) {
      actionsContent = (
        <ul className="list-inline text-centered">
          <li className="list-inline-item">
            <Link to="/profile-basic" className="btn btn-primary">
              <i className="far fa-plus-square" /> Create Profile
            </Link>
          </li>
        </ul>
      );
    } else if (user.id === userid) {
      //if profile exists show EDIT and DELETE
      actionsContent = (
        <ul className="list-inline text-centered">
          <li className="list-inline-item">
            <Link to="/profile-basic" className="btn btn-primary">
              <i className="fas fa-pencil-alt" /> Edit Profile
            </Link>
          </li>
          <li className="list-inline-item">
            <button
              type="button" className="btn btn-danger"
              onClick={this.deleteHandler.bind(this)}
            >
              <i className="far fa-trash-alt" /> Delete Profile
            </button>
          </li>
        </ul>
      );
    }

    return <div className="content-block">{actionsContent}</div>;
  }
}

ProfileActions.propTypes = {
  profileExists: PropTypes.bool.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps, {deleteAccount }
)(ProfileActions);
