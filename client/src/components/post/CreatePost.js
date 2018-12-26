import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import init from '../../config/init';

import { createPost } from '../../actions/postActions';

import TextAreaFieldset from '../common/TextAreaFieldset';
import UploadFieldset from '../common/UploadFieldset';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postText: '',
      image: '',
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
    switch (e.target.name) {
      case 'image':
        this.setState({ image: e.target.files[0] });
        break;
      default:
        this.setState({ postText: e.target.value });
    }
  };

  submitHandler = e => {
    e.preventDefault();

    const { profile } = this.props;

    const newPost = new FormData();
    newPost.append('image', this.state.image);
    newPost.append('text', this.state.postText);
    newPost.append(
      'name',
      profile.user.name.first + ' ' + profile.user.name.last
    );
    newPost.append('avatar', profile.avatar);

    this.setState({ postText: '', image: '' });

    this.props.createPost(newPost);
  };

  render() {
    const { errors } = this.state;
    const { profile } = this.props;

    return (
      <div className="create-post">
        <form noValidate onSubmit={this.submitHandler}>
          <div className="col-md-12 col-sm-12">
            <div className="form-group">
              <img
                src={
                  profile
                    ? profile.avatar
                      ? init.uploadAvatarPath + profile.avatar
                      : '/images/default/avatar.jpg'
                    : '/images/default/avatar.jpg'
                }
                alt="Avatar"
                className="profile-photo-md"
              />
              <TextAreaFieldset
                name="postText"
                value={this.state.postText}
                onChange={this.changeHandler}
                error={errors.text}
                placeholder="Write what you wish"
              />
            </div>
            <div>
              <div className="tools">
                <div className="publishing-tools">
                  <UploadFieldset
                    id="image"
                    name="image"
                    value={this.state.image}
                    onChange={this.changeHandler}
                    error={errors.image}
                  />
                  <button type="submit" className="btn btn-primary">
                    Publish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

CreatePost.propTypes = {
  profile: PropTypes.object,
  createPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createPost }
)(CreatePost);
