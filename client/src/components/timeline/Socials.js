import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Socials extends Component {
  render() {
    const { profile } = this.props;

    let fbContent, ytContent, twContent, instContent;

    if (profile.social) {
      if (profile.social.youtube) {
        ytContent = (
          <li className="list-inline-item">
            <a href={profile.social.youtube} target="_blank">
              <i className="fab fa-youtube" />
            </a>
          </li>
        );
      }

      if (profile.social.facebook) {
        fbContent = (
          <li className="list-inline-item">
            <a href={profile.social.facebook} target="_blank">
              <i className="fab fa-facebook" />
            </a>
          </li>
        );
      }

      if (profile.social.twitter) {
        twContent = (
          <li className="list-inline-item">
            <a href={profile.social.twitter} target="_blank">
              <i className="fab fa-twitter" />
            </a>
          </li>
        );
      }

      if (profile.social.instagram) {
        instContent = (
          <li className="list-inline-item">
            <a href={profile.social.instagram} target="_blank">
              <i className="fab fa-instagram" />
            </a>
          </li>
        );
      }
    }
    return (
      <div className="content-block">
        <h5 className="grey">
          <i className="fas fa-comment icon-in-title" />Social Network
        </h5>
        <ul className="list-inline social-icons">
          {ytContent}
          {fbContent}
          {instContent}
          {twContent}
        </ul>
      </div>
    );
  }
}

Socials.propTypes = {
  profile: PropTypes.object.isRequired
};

export default Socials;
