import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPosts } from '../../actions/postActions';
import { getCurrentProfile } from '../../actions/profileActions';

import Loader from '../common/Loader';
import ProfileCard from './ProfileCard';
import Menu from './Menu';
import CreatePost from '../post/CreatePost';
import Posts from '../post/Posts';

class MyNewsfeed extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getPosts();
  }

  render() {
    const { profile } = this.props.profile;
    const { posts, loading } = this.props.post;

    let postsContent;
    let profileContent;

    if (posts === null || loading) {
      postsContent = <Loader />;
    } else {
      postsContent = <Posts posts={posts} />;
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
              <Menu />
            </div>
            <div className="col-md-7">
              <CreatePost profile={profile} />
              {postsContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MyNewsfeed.propTypes = {
  profile: PropTypes.object,
  getCurrentProfile: PropTypes.func,
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getPosts }
)(MyNewsfeed);
