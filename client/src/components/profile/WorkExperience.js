import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';

import consts from '../../config/consts';

import {
  createWorkExperience,
  getCurrentProfile,
  deleteExperience
} from '../../actions/profileActions';

import ProfileMenu from './ProfileMenu';
import Header from '../timeline/Header';
import InputFieldset from '../common/InputFieldset';
import SelectListFieldset from '../common/SelectListFieldset';

class WorkExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      company: '',
      from: '',
      to: '',
      current: false,
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
  };

  changeHandler = e => {
    this.state.errors[e.target.name] = '';
    switch (e.target.name) {
      case 'current':
        this.setState({
          disabled: !this.state.disabled,
          current: !this.state.current
        });
        break;
      default:
        this.setState({ [e.target.name]: e.target.value });
    }
  };

  submitHandler = e => {
    e.preventDefault();

    const newExperience = {
      title: this.state.title,
      company: this.state.company,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current
    };

    this.props.createWorkExperience(newExperience, this.props.history);
  };

  deleteHandler = exp_id => {
    this.props.deleteExperience(exp_id);
  };

  render() {
    const { errors } = this.state;
    const { profile } = this.props.profile;

    let workExperienceList;

    if (
      profile !== null &&
      profile.workExperience &&
      profile.workExperience.length > 0
    ) {
      workExperienceList = (
        <table className="table">
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Years</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {profile.workExperience.map((exp, i) => (
              <tr key={i}>
                <td>{consts.jobTitleOptions[exp.title].label}</td>
                <td>{exp.company}</td>
                <td>
                  <Moment format="DD. MMMM YYYY">{exp.from}</Moment> -{' '}
                  {exp.to === null ? (
                    ' Present'
                  ) : (
                    <Moment format="DD. MMMM YYYY">{exp.to}</Moment>
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    onClick={this.deleteHandler.bind(this, exp._id)}
                    className="btn btn-danger btn-sm"
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return (
      <div className="container">
        <div className="timeline">
          <Header profile={profile} activeLink="" />
          <div id="page-contents">
            <div className="row">
              <div className="col-md-3">
                <ProfileMenu active="experience" />
              </div>
              <div className="col-md-7">
                <div className="block-title">
                  <h4 className="text-green text-center mb-4">
                    <i className="fas fa-briefcase icon-in-title" /> Work
                    Experience
                  </h4>
                </div>
                <div className="form-wrapper">
                  <form
                    noValidate
                    onSubmit={this.submitHandler}
                    className="create-profile"
                  >
                    <div className="content-block">
                      {workExperienceList}
                      <SelectListFieldset
                        label="Job Title"
                        name="title"
                        value={this.state.title}
                        onChange={this.changeHandler}
                        placeholder="Title"
                        options={consts.jobTitleOptions}
                        error={errors.title}
                      />
                      <InputFieldset
                        label="Company"
                        name="company"
                        value={this.state.company}
                        onChange={this.changeHandler}
                        placeholder="Company"
                        error={errors.company}
                      />
                      <InputFieldset
                        label="From date"
                        type="date"
                        name="from"
                        value={this.state.from}
                        onChange={this.changeHandler}
                        placeholder="Date from"
                        error={errors.from}
                      />
                      <InputFieldset
                        label="Date to"
                        type="date"
                        name="to"
                        value={this.state.to}
                        onChange={this.changeHandler}
                        placeholder="Date to"
                        error={errors.to}
                        disabled={this.state.disabled ? 'disabled' : ''}
                      />
                      <fieldset className="form-group form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="current"
                          value={this.state.current}
                          checked={this.state.current}
                          onChange={this.changeHandler}
                          id="current"
                        />
                        <label htmlFor="current" className="form-check-label">
                          Current
                        </label>
                      </fieldset>
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

WorkExperience.propTypes = {
  createWorkExperience: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createWorkExperience, getCurrentProfile, deleteExperience }
)(withRouter(WorkExperience));
