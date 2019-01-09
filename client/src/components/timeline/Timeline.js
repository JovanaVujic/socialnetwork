import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProfileByUserId } from '../../actions/profileActions';
import { getPostsByUserId } from '../../actions/postActions';

import Loader from '../common/Loader';
import Header from './Header';
import CreatePost from '../post/CreatePost';
import Posts from '../post/Posts';

class Timeline extends Component {
  componentDidMount = () => {
    if (this.props.match.params.user_id) {
      this.props.getProfileByUserId(this.props.match.params.user_id);
      this.props.getPostsByUserId(this.props.match.params.user_id);
    }
  };

  render() {
    const { posts, post_loading } = this.props.post;
    const { profile, loading } = this.props.profile;
    const { user } = this.props.auth;

    let timelineContent;
    let headerContent;
    let createPostContent;

    if (profile !== null && !loading) {
      headerContent = <Header profile={profile} activeLink="Timeline" />;

      if (user.id === profile.user.id) {
        createPostContent = <CreatePost profile={profile} />;
      }
    }

    if (posts === null || post_loading) {
      timelineContent = <Loader />;
    } else {
      timelineContent = (
        <div className="container">
          <div className="timeline">
            {headerContent}
            <div id="page-contents" className="mt-5">
              <div className="row">
                <div className="col-md-3" />
                <div className="col-md-7">
                  {createPostContent}
                  <Posts showPostData="true" posts={posts} />
                </div>
                <div className="col-md-2 static" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div>{timelineContent}</div>;
  }
}

Timeline.propTypes = {
  profile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  showPostData: PropTypes.bool
};

const mapStateToProps = state => ({
  profile: state.profile,
  post: state.post, 
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileByUserId, getPostsByUserId }
)(Timeline);
