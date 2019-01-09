import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import init from '../../config/init';

import { addImage, deleteImage } from '../../actions/albumActions';

import TextAreaFieldset from '../common/TextAreaFieldset';
import UploadFieldset from '../common/UploadFieldset';
import Loader from '../common/Loader';

class Images extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      image: '',
      limit: 2,
      errors: {}
    };

    this.onChange = this.changeHandler.bind(this);
    this.onSubmit = this.submitHandler.bind(this);
    this.onLoadMore = this.loadMoreHandler.bind(this);
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  changeHandler = e => {
    this.state.errors[e.target.name] = '';
    switch (e.target.name) {
      case 'image':
        this.setState({ image: e.target.files[0] });
        break;
      default:
        this.setState({ comment: e.target.value });
    }
  };

  submitHandler = e => {
    e.preventDefault();

    const newImage = new FormData();
    newImage.append('image', this.state.image);
    newImage.append('comment', this.state.comment);

    this.setState({ image: '', comment: '' });

    this.props.addImage(newImage);
  };

  loadMoreHandler = () => {
    this.setState({
      limit: this.state.limit + 2
    });
  };

  deleteHandler = image => {
    this.props.deleteImage(image);
  };

  render() {
    const { errors } = this.state;
    const { myAlbum, album } = this.props;

    let imagesContent;
    let loadMoreButton;

    let uploadContent = myAlbum ? (
      <div className="form-wrapper">
        <div className="content-block">
          <h5 className="grey">
            <i className="fas fa-image icon-in-title" />
            Add New Image
          </h5>
          <form onSubmit={this.submitHandler}>
            <UploadFieldset
              label="Image"
              id="image"
              name="image"
              value={this.state.image}
              onChange={this.changeHandler}
              error={errors.image}
            />

            <div className="mt-2">
              <TextAreaFieldset
                label="Comment on image"
                placeholder="Comment on image"
                name="comment"
                value={this.state.comment}
                onChange={this.changeHandler}
                error={errors.comment}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    ) : null;

    if (album.images === null || album.loading) {
      if (album.loading) {
        imagesContent = <Loader />;
      }
    } else {
      if (album.images.images && album.images.images.length > 0) {
        imagesContent = album.images.images
          .slice(0, this.state.limit)
          .map((item, i) => (
            <li key={i}>
              {myAlbum ? (
                <button
                  onClick={this.deleteHandler.bind(this, item._id)}
                  type="button"
                  className="btn btn-danger"
                >
                  <i className="fas fa-times" />
                </button>
              ) : null}
              <div
                className="img-wrapper"
                data-toggle="modal"
                data-target={'.photo-' + i}
              >
                <img src={init.uploadImagePath + item.image} alt="" />
              </div>
              <div
                className={'modal fade photo-' + i}
                role="dialog"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <img src={init.uploadImagePath + item.image} alt="" />
                    <p>{item.comment}</p>
                  </div>
                </div>
              </div>
            </li>
          ));

        if (this.state.limit <= album.images.images.length) {
          loadMoreButton = (
            <button
              onClick={this.loadMoreHandler}
              type="button"
              className="load-more btn btn-link"
            >
              Load more
            </button>
          );
        }
      }
    }

    return (
      <div>
        {uploadContent}
        <ul className="album-photos">{imagesContent}</ul>
        {loadMoreButton}
      </div>
    );
  }
}

Images.propTypes = {
  album: PropTypes.object.isRequired,
  myAlbum: PropTypes.bool.isRequired,
  addImage: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addImage, deleteImage }
)(Images);
