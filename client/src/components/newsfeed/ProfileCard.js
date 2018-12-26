import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import init from '../../config/init';

class ProfileCard extends Component {
  render() {
    const { user } = this.props.auth;
    const { profile } = this.props;

    return (
      <div className="profile-card">
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
        <h5 className="mt-4">
          <Link to={`/timeline/${profile.user._id}`} className="text-white">
            {user.name.first + ' ' + user.name.last}
          </Link>
        </h5>
      </div>
    );
  }
}

ProfileCard.propTypes = {
  profile: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(ProfileCard);
