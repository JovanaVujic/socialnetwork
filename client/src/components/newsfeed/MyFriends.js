import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Loader from '../common/Loader';
import ProfileCard from './ProfileCard';
import Menu from './Menu';
import CreatePost from '../post/CreatePost';
import FriendList from './FriendList';

import { getCurrentProfile, getFriendsProfile } from '../../actions/profileActions';

class MyFriends extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getFriendsProfile();
  }

  render() {
    const { profile, profiles, loading } = this.props.profile;

    let profileContent;
    let friendsContent;

    if (profiles === null || loading) {
      friendsContent = <Loader />;
    } else {
      friendsContent = <FriendList friends={profiles} profile={profile}/>;
    }

    if (profile != null) {
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
              <CreatePost profile = {profile}/>
              {friendsContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MyFriends.propTypes = {
  profile: PropTypes.object,
  profiles: PropTypes.array,
  getCurrentProfile: PropTypes.func,
  getFriendsProfile: PropTypes.func
};

const mapStateToProps = state => ({
  profile: state.profile,
  profiles: state.profiles
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getFriendsProfile }
)(MyFriends);
