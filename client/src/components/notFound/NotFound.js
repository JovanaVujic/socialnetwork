import React, { Component } from 'react';

class NotFound extends Component {
  render() {
  
    return (
      <main className="container-fluid">
        <div className="row">
          <div className="not-found-form">
            <h2 className="text-black">Not Found</h2>
            <div className="form-wrapper">
              Profile does not exist anymore
            </div>
          </div>
        </div>
      </main>
    );
  }
}


export default NotFound;
