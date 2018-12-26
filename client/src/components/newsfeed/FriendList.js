import React, { Component } from 'react';

class FriendList extends Component {
  render() {
    return (
      <div className="friend-list">
        <div className="row">
          <div className="col-md-6 col-sm-6">
            <div className="friend-card">
              <img
                src="images/covers/1.jpg"
                alt="profile"
                className="img-responsive cover"
              />
              <div className="card-info">
                <img
                  src="images/users/user-3.jpg"
                  alt="user"
                  className="profile-photo-lg"
                />
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
        </div>
      </div>
    );
  }
}

export default FriendList;
