import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import init from '../../config/init';
import isEmpty from '../../validation/isEmpty';

class Media extends Component {
  render() {
    const { albums } = this.props;

    let mediaContent;
    let allAlbums = [];
    if (!isEmpty(albums)) {
      console.log(albums);
      albums.map((album, i) =>
        album.images.map(image => {
          allAlbums.push({
            user: album.user,
            imageContent: image
          });
          return image;
        })
      );
    }

    if (allAlbums !== []) {
      mediaContent = allAlbums.map((album, i) => (
        <div className="grid-item col-md-6 col-sm-6" key={i}>
          <div className="media-grid">
            <Link to={`/timeline-album/${album.user._id}`}>
              <div className="img-wrapper">
                <img
                  src={init.uploadImagePath + album.imageContent.image}
                  alt=""
                  className="img-responsive post-image"
                />
              </div>
            </Link>
            <div className="media-user-info">
              <div className="user-info">
                <div className="user">
                  <h6>
                    <Link
                      to={`/timeline-about/${album.user._id}`}
                      className="profile-link"
                    >
                      {album.user.name.first + ' ' + album.user.name.last}
                    </Link>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
    }

    return (
      <div className="media">
        <div className="row js-masonry">
          {mediaContent}
        </div>
      </div>
    );
  }
}

export default Media;
