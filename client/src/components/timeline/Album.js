import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProfileByUserId, checkFriends } from '../../actions/profileActions';
import { getImagesByUserId } from '../../actions/albumActions';

import Loader from '../common/Loader';
import Header from './Header';
import Images from './Images';

class Album extends Component {
  componentDidMount = () => {
    if (this.props.match.params.user_id) {
      this.props.getProfileByUserId(this.props.match.params.user_id);
      this.props.getImagesByUserId(this.props.match.params.user_id);
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
    const { profile, loading } = this.props.profile;
    const { album } = this.props;
    const { user } = this.props.auth;

    let albumContent;
    let myAlbum = this.props.match.params.user_id === user.id;

    if (profile === null || loading) {
      albumContent = <Loader />;
    } else {
      albumContent = (
        <div className="container">
          <div className="timeline">
            <Header profile={profile} activeLink="Album" />
            <div id="page-contents">
              <div className="row">
                <div className="col-md-3" />
                <div className="col-md-7">
                  <div className="profile">
                    <Images myAlbum={myAlbum} album={album} />
                  </div>
                </div>
                <div className="col-md-2 static" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div>{albumContent}</div>;
  }
}

Album.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  album: PropTypes.object.isRequired,
  getImagesByUserId: PropTypes.func.isRequired,
  getProfileByUserId: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  album: state.album, 
  isFriends: state.isFriends
});

export default connect(
  mapStateToProps,
  { getProfileByUserId, getImagesByUserId, checkFriends }
)(Album);
