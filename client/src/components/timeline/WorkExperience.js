import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import consts from '../../config/consts';

class WorkExperience extends Component {
  render() {
    const { profile } = this.props;

    let experienceContent;

    if (profile.workExperience && profile.workExperience.length > 0) {
      experienceContent = profile.workExperience.map((exp, i) => (
        <div className="organization" key={i}>
          <img src="images/envato.png" alt="" className="pull-left img-org" />
          <div className="work-info">
            <h5>{consts.jobTitleOptions[exp.title].label}</h5>
            <p>
              <b>{exp.company}</b>
              <br />
              <span className="text-grey">
                <Moment format="DD. MMMM YYYY">{exp.from}</Moment> -{' '}
                {exp.to === null ? (
                  ' Present'
                ) : (
                  <Moment format="DD. MMMM YYYY">{exp.to}</Moment>
                )}
              </span>
            </p>
          </div>
        </div>
      ));
    }

    return (
      <div className="content-block">
        <h5 className="grey">
          <i className="fas fa-briefcase icon-in-title" />
          Work Experiences
        </h5>
        {experienceContent}
      </div>
    );
  }
}

WorkExperience.propTypes = {
  profile: PropTypes.object.isRequired
};

export default WorkExperience;
