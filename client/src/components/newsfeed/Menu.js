import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Menu extends Component {
  render() {
    const { activeLink } = this.props;
    return (
      <div>
        <ul className="nav-news-feed">
          <li>
            <Link
              to="/newsfeed"
              className={activeLink === 'MyNewsfeed' ? 'active' : ''}
            >
              <i className="far fa-newspaper text-red mr-2" />
              My Newsfeed
            </Link>
          </li>
          <li>
            <Link
              to="/newsfeed-friends"
              className={activeLink === 'Friends' ? 'active' : ''}
            >
              <i className="fas fa-users text-blue mr-2" />
              Friends
            </Link>
          </li>
          <li>
            <Link
              to="/newsfeed-images"
              className={activeLink === 'Images' ? 'active' : ''}
            >
              <i className="far fa-images text-green mr-2" />
              Images
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

Menu.propTypes = {
  activeLink: PropTypes.string
};

export default Menu;
