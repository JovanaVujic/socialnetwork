import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import isEmpty from '../../validation/isEmpty';

import {
  createBasicInfo,
  getCurrentProfile
} from '../../actions/profileActions';

import ProfileMenu from './ProfileMenu';
import Header from '../timeline/Header';
import TextAreaFieldset from '../common/TextAreaFieldset';
import UploadFieldset from '../common/UploadFieldset';

class BasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      info: '',
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
        profile.info = !isEmpty(profile.info) ? profile.info : '';
        profile.avatar = !isEmpty(profile.avatar) ? profile.avatar : '';

        // Set component fields state
        this.setState({
          avatar: profile.avatar,
          info: profile.info
        });
      }
    }
  };

  changeHandler = e => {
    this.state.errors[e.target.name] = '';
    switch (e.target.name) {
      case 'avatar':
        this.setState({ avatar: e.target.files[0] });
        break;
      default:
        this.setState({ info: e.target.value });
    }
  };

  submitHandler = e => {
    e.preventDefault();

    const newProfile = new FormData();
    newProfile.append('avatar', this.state.avatar);
    newProfile.append('info', this.state.info);

    this.props.createBasicInfo(newProfile, this.props.history);
  };

  render() {
    const { errors } = this.state;
    const { profile } = this.props.profile;

    return (
      <div className="container">
        <div className="timeline">
          <Header profile={profile} activeLink="" />
          <div id="page-contents">
            <div className="row">
              <div className="col-md-3">
                <ProfileMenu active="basic" />
              </div>
              <div className="col-md-7">
                <div className="block-title">
                  <h4 className="text-green text-center mb-4">
                    <i className="fas fa-info-circle icon-in-title" /> Basic
                    information
                  </h4>
                </div>
                <div className="form-wrapper">
                  <form
                    noValidate
                    onSubmit={this.submitHandler}
                    className="create-profile"
                  >
                    <div className="content-block">
                      <TextAreaFieldset
                        label="Personal information"
                        name="info"
                        value={this.state.info}
                        onChange={this.changeHandler}
                        error={errors.info}
                      />
                    </div>
                    <div className="content-block">
                      <UploadFieldset
                        label="Avatar"
                        id="avatar"
                        name="avatar"
                        value={this.state.avatar}
                        onChange={this.changeHandler}
                        error={errors.avatar}
                      />
                    </div>
                    <div className="content-block mt-3">
                      <button type="submit" className="btn btn-success btn-lg">
                        Save
                      </button>
                    </div>
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

BasicInfo.propTypes = {
  createBasicInfo: PropTypes.func.isRequired,
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
  { createBasicInfo, getCurrentProfile }
)(withRouter(BasicInfo));
