import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProfileMenu extends Component {
  render() {
    const { active } = this.props;
    return (
      <div>
        <ul className="edit-menu">
          <li className={active === 'basic' ? 'active' : ''}>
            <Link to="profile-basic">Basic Information</Link>
          </li>
          <li className={active === 'experience' ? 'active' : ''}>
            <Link to="profile-experience">Work experience</Link>
          </li>
          <li className={active === 'interests' ? 'active' : ''}>
            <Link to="profile-interests">Interests</Link>
          </li>
          <li className={active === 'socials' ? 'active' : ''}>
            <Link to="profile-socials">Socials</Link>
          </li>
        </ul>
      </div>
    );
  }
}

ProfileMenu.propTypes = {
  active: PropTypes.string.isRequired
};

export default ProfileMenu;
