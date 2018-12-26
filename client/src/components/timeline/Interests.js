import React, { Component } from 'react';
import PropTypes from 'prop-types';
import consts from '../../config/consts';

class Interests extends Component {
  render() {
    const { profile } = this.props;

    let interestsContent;

    if (profile.interests && profile.interests.length > 0) {
      interestsContent = profile.interests.map(i => (
        <li key={i} className="list-inline-item">
          <span className="int-icons" title={consts.interestsOptions[i].title}>
            <i className={consts.interestsOptions[i].icon} />
          </span>
        </li>
      ));
    }

    return (
      <div className="content-block">
        <h5 className="grey">
          <i className="fas fa-heart icon-in-title" />
          Interests
        </h5>
        <ul className="interests list-inline">{interestsContent}</ul>
      </div>
    );
  }
}

Interests.propTypes = {
  profile: PropTypes.object.isRequired
};

export default Interests;
