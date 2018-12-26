import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import isEmpty from '../../validation/isEmpty';

import { createSocials, getCurrentProfile } from '../../actions/profileActions';

import Loader from '../common/Loader';
import ProfileMenu from './ProfileMenu';
import Header from '../timeline/Header';
import InputFieldset from '../common/InputFieldset';

class Socials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      youtube: '',
      facebook: '',
      twitter: '',
      instagram: '',
      errors: {}
    };

    this.onChange = this.changeHandler.bind(this);
    this.onSubmit = this.submitHandler.bind(this);
  }

  componentDidMount = () => {
    this.props.getCurrentProfile();
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      if (!isEmpty(profile)) {
        profile.social = !isEmpty(profile.social) ? profile.social : {};
        profile.youtube = !isEmpty(profile.social.youtube)
          ? profile.social.youtube
          : '';
        profile.facebook = !isEmpty(profile.social.facebook)
          ? profile.social.facebook
          : '';
        profile.twitter = !isEmpty(profile.social.twitter)
          ? profile.social.twitter
          : '';
        profile.instagram = !isEmpty(profile.social.instagram)
          ? profile.social.instagram
          : '';

        // Set component fields state
        this.setState({
          youtube: profile.youtube,
          facebook: profile.facebook,
          twitter: profile.twitter,
          instagram: profile.instagram
        });
      }
    }
  };

  changeHandler = e => {
    this.state.errors[e.target.name] = '';
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();

    const profileData = {
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createSocials(profileData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    const { profile, loading } = this.props.profile;

    return (
      <div className="container">
        <div className="timeline">
          <Header profile={profile} activeLink="" />
          <div id="page-contents">
            <div className="row">
              <div className="col-md-3">
                <ProfileMenu active="socials" />
              </div>
              <div className="col-md-7">
                <div className="block-title">
                  <h4 className="text-green text-center mb-4">
                    <i className="fas fa-comment icon-in-title" /> Socials
                  </h4>
                </div>
                <div className="form-wrapper">
                  <form
                    noValidate
                    onSubmit={this.submitHandler}
                    className="create-profile"
                  >
                    <div className="content-block">
                      <InputFieldset
                        label="Facebook"
                        name="facebook"
                        value={this.state.facebook}
                        onChange={this.changeHandler}
                        placeholder="Facebook"
                        icon="fa-facebook"
                        error={errors.facebook}
                      />
                      <InputFieldset
                        label="Twitter"
                        name="twitter"
                        value={this.state.twitter}
                        onChange={this.changeHandler}
                        placeholder="Twitter"
                        icon="fa-twitter"
                        error={errors.twitter}
                      />
                      <InputFieldset
                        label="Instagram"
                        name="instagram"
                        value={this.state.instagram}
                        onChange={this.changeHandler}
                        placeholder="Instagram"
                        icon="fa-instagram"
                        error={errors.instagram}
                      />
                      <InputFieldset
                        label="Youtube"
                        name="youtube"
                        value={this.state.youtube}
                        onChange={this.changeHandler}
                        placeholder="Youtube"
                        icon="fa-youtube"
                        error={errors.youtube}
                      />
                    </div>
                    <button type="submit" className="btn btn-success btn-lg">
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Socials.propTypes = {
  createSocials: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createSocials, getCurrentProfile }
)(withRouter(Socials));
