import React, { Component } from 'react';
import PropTypes from 'prop-types';
import init from '../../config/init';

class UserInfo extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="profile-info">
        <img
          src={
            profile
              ? profile.avatar
                ? init.uploadAvatarPath + profile.avatar
                : '/images/default/avatar.jpg'
              : '/images/default/avatar.jpg'
          }
          alt="Avatar"
          className="img-responsive profile-photo"
        />
        <h3>
          {profile !== null
            ? profile.user.name.first + ' ' + profile.user.name.last
            : null}
        </h3>
      </div>
    );
  }
}

UserInfo.propTypes = {
  profile: PropTypes.object
};

export default UserInfo;
