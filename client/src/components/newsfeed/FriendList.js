import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import init from '../../config/init';

class FriendList extends Component {
  render() {
    const { friends, profile } = this.props;

    let friendsContent;

    if (friends != null) {
      friendsContent = friends.map((friend, i) => (
        <div className="col-md-6 col-sm-6" key={i}>
            <div className="friend-card">
            <img
                src={init.uploadAvatarPath + friend.avatar}
                alt="Profile"
                className="img-responsive cover"
              />
              <div className="card-info">
                <img
                  src={init.uploadAvatarPath + profile.avatar}
                  alt="user"
                  className="profile-photo-lg"
                />
                <div className="friend-info">
                  <div className="pull-right text-green">
                    My Friend
                  </div>
                  <h5>
                    <Link to={`/timeline/${friend.user._id}`} className="profile-link">
                    {friend.user.name.first}  {friend.user.name.last}
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
          </div>
      ));
    }

    return (
      <div className="friend-list">
        <div className="row">
          {friendsContent}
        </div>
      </div>
    );
  }
}

export default FriendList;