import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import isEmpty from '../../validation/isEmpty';

import consts from '../../config/consts';

import {
  createInterests,
  getCurrentProfile
} from '../../actions/profileActions';

import ProfileMenu from './ProfileMenu';
import Header from '../timeline/Header';
import CheckboxGroupFieldset from '../common/CheckboxGroupFieldset';

class Interests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interests: []
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
      // Set component fields state
      if (!isEmpty(profile)) {
        this.setState({
          interests: profile.interests
        });
      }
    }
  };

  changeHandler = e => {
    if (this.state.interests.includes(e.target.value)) {
      let filtered = this.state.interests.filter(
        item => item !== e.target.value
      );

      this.setState({ interests: filtered });
    } else {
      this.state.interests.unshift(e.target.value);
      this.setState({
        interests: this.state.interests
      });
    }
  };

  submitHandler = e => {
    e.preventDefault();

    const newInterests = {
      interests: this.state.interests
    };
    this.props.createInterests(newInterests, this.props.history);
  };

  render() {
    const { profile } = this.props.profile;

    return (
      <div className="container">
        <div className="timeline">
          <Header profile={profile} activeLink="" />
          <div id="page-contents">
            <div className="row">
              <div className="col-md-3">
                <ProfileMenu active="interests" />
              </div>
              <div className="col-md-7">
                <div className="block-title">
                  <h4 className="text-green text-center mb-4">
                    <i className="fas fa-heart icon-in-title" /> Interests
                  </h4>
                </div>
                <div className="form-wrapper">
                  <form
                    noValidate
                    onSubmit={this.submitHandler}
                    className="create-profile"
                  >
                    <div className="content-block">
                      <CheckboxGroupFieldset
                        onChange={this.changeHandler}
                        name="interests"
                        checkedOpt={this.state.interests}
                        options={consts.interestsOptions}
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

Interests.propTypes = {
  createInterests: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createInterests, getCurrentProfile }
)(withRouter(Interests));
