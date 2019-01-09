import React, { Component } from 'react';
import ProfileCard from './ProfileCard';
import Menu from './Menu';
import CreatePost from '../post/CreatePost';
import Media from './Media';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getFriendsImages } from '../../actions/albumActions';
import { getCurrentProfile } from '../../actions/profileActions';

import Loader from '../common/Loader';

class Images extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getFriendsImages();
  }

  render() {
    const { profile } = this.props.profile;
    const { images, loading } = this.props.album;

    let imagesContent;
    let profileContent;

    if (images === null || loading) {
      imagesContent = <Loader />;
    } else {
      imagesContent = <Media albums={images} />;
    }

    if (profile !== null) {
      profileContent = <ProfileCard profile={profile} />;
    }

    return (
      <div id="page-contents">
        <div className="container">
          <div className="row">
            <div className="col-md-3 static">
              {profileContent}
              <Menu activeLink="Images" />
            </div>
            <div className="col-md-7">
              <CreatePost profile={profile} />
              {imagesContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Images.propTypes = {
  profile: PropTypes.object,
  getCurrentProfile: PropTypes.func,
  album: PropTypes.object.isRequired,
  getFriendsImages: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  album: state.album
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getFriendsImages }
)(Images);
