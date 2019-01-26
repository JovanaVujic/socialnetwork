import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import init from '../../config/init';

class UserInfo extends Component {
  render() {
    const { profile } = this.props;

    let userfullName;
    if (profile != null && profile.user != null && profile.user.name != null) {
      userfullName = profile.user.name.first + ' ' + profile.user.name.last;
    }

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
          {userfullName}
        </h3>
      </div>
    );
  }
}

UserInfo.propTypes = {
  profile: PropTypes.object,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps, { }
)(UserInfo);
