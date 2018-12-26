import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import init from '../../config/init';
import { addComment } from '../../actions/postActions';

import TextAreaFieldGroup from '../common/TextAreaFieldset';

class CreateComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {}
    };

    this.onChange = this.changeHandler.bind(this);
    this.onSubmit = this.submitHandler.bind(this);
  }

  componentWillReceiveProps = newProps => {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();

    const { user } = this.props.auth;
    const { _id, avatar } = this.props.post;

    const newComment = {
      text: this.state.text,
      name: user.name.first + ' ' + user.name.last,
      avatar
    };

    this.props.addComment(_id, newComment);

    this.setState({ text: '' });
  };

  render() {
    const { errors, post, avatar } = this.props;
    return (
      <div>
        {post.comments.map((comment, i) => (
          <div className="post-comment" key={i}>
            <img
              src={init.uploadAvatarPath + comment.avatar}
              alt=""
              className="profile-photo-sm"
            />
            <p className="post-link">
              <a href="/timeline" className="profile-link">
                {comment.name}
              </a>{' '}
              {comment.text}
            </p>
          </div>
        ))}
        <div className="post-comment">
          <img
            src={init.uploadAvatarPath + avatar}
            alt=""
            className="profile-photo-sm"
          />
          <form
            onSubmit={this.submitHandler}
            className="container post-comment-form"
          >
            <div className="row">
              <TextAreaFieldGroup
                placeholder="Post a comment"
                name="text"
                value={this.state.text}
                onChange={this.changeHandler}
                error={errors.text}
              />
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-share-square" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

CreateComment.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(CreateComment);
