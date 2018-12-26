import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PersonalInfo extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="content-block">
        <h5 className="grey">
          <i className="fas fa-info-circle icon-in-title" />Personal Information
        </h5>
        <p>{profile.info}</p>
      </div>
    );
  }
}

PersonalInfo.propTypes = {
  profile: PropTypes.object.isRequired
};

export default PersonalInfo;
