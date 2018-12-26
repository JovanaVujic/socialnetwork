import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';
import isEmpty from '../../validation/isEmpty';

class Header extends Component {
  render() {
    const { profile, activeLink } = this.props;

    let profileMenuContent;

    if (!isEmpty(profile)) {
      profileMenuContent = (
        <div>
          <ul className="list-inline profile-menu">
            <li>
              <Link
                to={`/timeline/${profile.user._id}`}
                className={activeLink === 'Timeline' ? 'active' : ''}
              >
                Timeline
              </Link>
            </li>
            <li>
              <Link
                to={`/timeline-about/${profile.user._id}`}
                className={activeLink === 'About' ? 'active' : ''}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to={`/timeline-album/${profile.user._id}`}
                className={activeLink === 'Album' ? 'active' : ''}
              >
                Album
              </Link>
            </li>
            <li>
              <Link
                to={`/timeline-friends/${profile.user._id}`}
                className={activeLink === 'Friends' ? 'active' : ''}
              >
                Friends
              </Link>
            </li>
            <li>
              <Link to="/newsfeed">Newsfeed</Link>
            </li>
          </ul>
          <ul className="follow-me list-inline">
            <li className="list-inline-item">
              <Link to="/add-friend" className="btn btn-primary">
                Add Friend
              </Link>
            </li>
          </ul>
        </div>
      );
    }

    return (
      <div>
        <div className="timeline-cover">
          <div className="timeline-nav-bar d-none d-md-block">
            <div className="row">
              <div className="col-md-3">
                <UserInfo profile={profile} />
              </div>
              <div className="col-md-9">{profileMenuContent}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  profile: PropTypes.object,
  activeLink: PropTypes.string.isRequired
};

export default Header;
