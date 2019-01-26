import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import init from '../../config/init';

class FriendList extends Component {
  render() {
    const { friends } = this.props;

    let friendsContent;
    if (friends != null) {
      friendsContent = friends.map((friend, i) => (
        <div className="col-md-6 col-sm-6" key={i}>
          <div className="friend-card">
            <img
              src={init.uploadAvatarPath + friend.avatar}
              alt="profile"
              className="img-responsive cover"
            />
            <div className="card-info">
              <div className="friend-info">
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
        <div className="row">{friendsContent}</div>
      </div>
    );
  }
}

FriendList.propTypes = {
  friends: PropTypes.array.isRequired
};

export default FriendList;
