import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import init from '../../config/init';

import { addLike, removeLike, deletePost } from '../../actions/postActions';

import CreateComment from './CreateComment';

class Posts extends Component {
  deleteHandler = id => {
    this.props.deletePost(id);
  };

  likeHandler = id => {
    this.props.addLike(id);
  };

  unlikeHandler = id => {
    this.props.removeLike(id);
  };

  IsUserLike = likes => {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { posts, showPostData, auth } = this.props;

    return posts.map((post, i) => (
      <div className="post-content" key={i}>
        {showPostData ? (
          <div className="post-date hidden-xs hidden-sm">
            <h5>{post.name}</h5>
            <p className="text-grey">
              <Moment format="DD. MMMM YYYY">{post.date}</Moment>
            </p>
          </div>
        ) : (
          ''
        )}
        {post.image != null ? (
          <img
            src={init.uploadImagePath + post.image}
            alt="post"
            className="img-responsive post-image"
          />
        ) : (
          ''
        )}
        <div className="post-container">
          <img
            src={init.uploadAvatarPath + post.avatar}
            alt="user"
            className="profile-photo-md float-left"
          />
          <div className="post-detail">
            <div className="user-info">
              <h5>
                <Link to="/timeline-about" className="profile-link">
                  {post.name}
                </Link>
              </h5>
              <p className="text-muted">
                Published{' '}
                <Moment fromNow ago>
                  {post.date}
                </Moment>{' '}
                ago
              </p>
            </div>
            <div className="reaction">
              <button
                className="btn btn-link btn-like"
                onClick={this.likeHandler.bind(this, post._id)}
                type="button"
              >
                {post.likes.length} {'   '}
                <i className="far fa-thumbs-up text-green" />
              </button>
              <button
                className="btn btn-link"
                onClick={this.unlikeHandler.bind(this, post._id)}
                type="button"
              >
                <i className="fa fa-thumbs-down text-red" />
              </button>
              {post.user === auth.user.id ? (
                <button
                  onClick={this.deleteHandler.bind(this, post._id)}
                  type="button"
                  className="btn btn-danger"
                >
                  <i className="fas fa-times" />
                </button>
              ) : null}
            </div>
            <div className="line-divider" />
            <div className="post-text">
              <p>{post.text}</p>
            </div>
            <div className="line-divider" />
            <CreateComment post={post} />
          </div>
        </div>
      </div>
    ));
  }
}

Posts.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(Posts);
