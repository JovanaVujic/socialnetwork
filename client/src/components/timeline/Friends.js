import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../common/Loader';
import Header from './Header';

import { getProfileByUserId, getFriendsProfileByUser, checkFriends } from '../../actions/profileActions';
import FriendList from './FriendList';

class Friends extends Component {
  componentDidMount = () => {
    if (this.props.match.params.user_id) {
      this.props.getProfileByUserId(this.props.match.params.user_id);
      this.props.getFriendsProfileByUser(this.props.match.params.user_id);
      this.props.checkFriends(this.props.match.params.user_id);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
    
    if(nextProps.profile.isFriends == false && this.props.profile.loading) {
      this.props.history.push('/private-profile'); 
    } 
  }

  render() {
    const { profile, profiles, loading } = this.props.profile;
    
    let friendsContent;

    if (profile === null || profiles === null || loading) {
      friendsContent = <Loader />;
    } else {
      friendsContent = (
        <div className="container">
          <div className="timeline">
            <Header profile={profile} activeLink="Friends" />
            <div id="page-contents">
              <div className="row">
                <div className="col-md-3" />
                <div className="col-md-7">
                  <div className="profile">
                    <FriendList friends={profiles} />
                  </div>
                </div>
                <div className="col-md-2 static" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div>{friendsContent}</div>;
  }
}

Friends.propTypes = {
  profile: PropTypes.object.isRequired,
  profiles: PropTypes.array.isRequired,
  getProfileByUserId: PropTypes.func.isRequired,
  getFriendsProfileByUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  profiles: state.profiles,
  isFriends: state.isFriends
});

export default connect(
  mapStateToProps,
  { getProfileByUserId, getFriendsProfileByUser, checkFriends }
)(Friends);
