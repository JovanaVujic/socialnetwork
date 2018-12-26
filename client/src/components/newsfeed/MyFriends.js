import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProfileCard from './ProfileCard';
import Menu from './Menu';
import CreatePost from '../post/CreatePost';
import FriendList from './FriendList';

import { getCurrentProfile } from '../../actions/profileActions';

class MyFriends extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { profile } = this.props.profile;

    let profileContent;

    if (profile !== null) {
      profileContent = <ProfileCard profile={profile} />;
    }
    return (
      <div id="page-contents">
        <div className="container">
          <div className="row">
            <div className="col-md-3 static">
              {profileContent}
              <Menu activeLink="Friends" />
            </div>
            <div className="col-md-7">
              <CreatePost />
              <FriendList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MyFriends.propTypes = {
  profile: PropTypes.object,
  getCurrentProfile: PropTypes.func
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(MyFriends);
