import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/isEmpty';

class ProfileActions extends Component {
  render() {
    const { profileExists } = this.props;

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
    } else {
      //if profile exists show EDIT and DELETE
      actionsContent = (
        <ul className="list-inline text-centered">
          <li className="list-inline-item">
            <Link to="/profile-basic" className="btn btn-primary">
              <i className="fas fa-pencil-alt" /> Edit Profile
            </Link>
          </li>
          <li className="list-inline-item">
            <Link to="/delete" className="btn btn-danger">
              <i className="far fa-trash-alt" /> Delete Profile
            </Link>
          </li>
        </ul>
      );
    }

    return <div className="content-block">{actionsContent}</div>;
  }
}

ProfileActions.propTypes = {
  profileExists: PropTypes.bool.isRequired
};

export default ProfileActions;
