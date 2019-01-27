import React, { Component } from 'react';

class PrivateProfile extends Component {
  render() {
  
    return (
      <main className="container-fluid">
        <div className="row">
          <div className="not-found-form">
            <h2 className="text-black">Private profile</h2>
            <div className="form-wrapper">
              You can see profile only if you are friend with this user.
            </div>
          </div>
        </div>
      </main>
    );
  }
}


export default PrivateProfile;
