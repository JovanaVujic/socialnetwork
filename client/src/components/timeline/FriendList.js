import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FriendList extends Component {
  render() {
    const { friends } = this.props;

    let friendsContent = friends.map((friend, i) => (
      <div className="col-md-6 col-sm-6" key={i}>
        <div className="friend-card">
          <img
            src="/images/default/coverImg.jpg"
            alt="profile"
            className="img-responsive cover"
          />
          <div className="card-info">
            <img src={friend.avatar} alt="user" className="profile-photo-lg" />
            <div className="friend-info">
              <a href="#" className="pull-right text-green">
                My Friend
              </a>
              <h5>
                <a href="timeline.html" className="profile-link">
                  Sophia Lee
                </a>
              </h5>
              <p>Student at Harvard</p>
            </div>
          </div>
        </div>
      </div>
    ));

    return (
      <div className="friend-list">
        <div className="row">{friendsContent}</div>
      </div>
    );
  }
}

FriendList.propTypes = {
  friends: PropTypes.array.isRequired
};

export default FriendList;
