import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from '../../validation/isEmpty';
import { getProfileByUserId } from '../../actions/profileActions';
import Loader from '../common/Loader';
import Header from './Header';
import ProfileActions from '../profile/ProfileActions';
import PersonalInfo from './PersonalInfo';
import WorkExperience from './WorkExperience';
import Interests from './Interests';
import Socials from './Socials';

class About extends Component {
  componentDidMount = () => {
    if (this.props.match.params.user_id) {
      this.props.getProfileByUserId(this.props.match.params.user_id);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    const { profile, loading } = this.props.profile;

    let profileContent;
    let aboutContent;

    if (profile === null || loading) {
      aboutContent = <Loader />;
    } else {
      if (!isEmpty(profile)) {
        profileContent = (
          <div>
            <PersonalInfo profile={profile} />
            <WorkExperience profile={profile} />
            <Interests profile={profile} />
            <Socials profile={profile} />
          </div>
        );
      }

      aboutContent = (
        <div className="container">
          <div className="timeline">
            <Header profile={profile} activeLink="About" />
            <div id="page-contents">
              <div className="row">
                <div className="col-md-3" />
                <div className="col-md-7">
                  <div className="profile">
                    <ProfileActions profileExists={!isEmpty(profile)} />
                    {profileContent}
                  </div>
                </div>
                <div className="col-md-2 static" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div>{aboutContent}</div>;
  }
}

About.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByUserId: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByUserId }
)(About);
