import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProfileByUserId, checkFriends } from '../../actions/profileActions';
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
    const { posts, post_loading } = this.props.post;
    const { profile, loading } = this.props.profile;
    const { user } = this.props.auth;

    let timelineContent;
    let headerContent;
    let createPostContent;
    let setMargin = true;

    if (profile !== null && !loading) {
      headerContent = <Header profile={profile} activeLink="Timeline" />;

      if (user.id === profile.user._id) {
        setMargin = false;
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
            <div id="page-contents" className={setMargin ? "mt-5" : ""}>
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
  auth: state.auth,
  isFriends: state.isFriends
});

export default connect(
  mapStateToProps,
  { getProfileByUserId, getPostsByUserId, checkFriends }
)(Timeline);
