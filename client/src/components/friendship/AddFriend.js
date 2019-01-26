import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import init from '../../config/init';

import isEmpty from '../../validation/isEmpty';
import consts from '../../config/consts';

import { getProfiles } from '../../actions/profileActions';
import {
  getAllFriendships,
  createFriendship
} from '../../actions/friendshipActions';

import Loader from '../common/Loader';
import InputFieldset from '../common/InputFieldset';

class AddFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      reload: false,
      errors: {}
    };

    this.onChange = this.changeHandler.bind(this);
  }

  componentDidMount = () => {
    this.props.getAllFriendships();
    this.props.getProfiles();
  };

  searchingFor = key => {
    return profile => {
      return (
        profile.user.username.toLowerCase().includes(key.toLowerCase()) || !key
      );
    };
  };

  findFrienshipStatus = id => {
    const { friendships } = this.props.friendship;
    const { user } = this.props.auth;

    let status = consts.friendshipsStatusForActiveUser.NOT_DEFINE;

    if (!isEmpty(friendships)) {
      friendships.map(item => {
        if (
          (item.fromUser === user.id && item.toUser === id) ||
          (item.toUser === user.id && item.fromUser === id)
        ) {
          if (item.actionUser === user.id) {
            status = consts.friendshipsStatusForActiveUser[item.status];
          } else {
            status = consts.friendshipsStatus[item.status];
          }
        }
        return item;
      });
    }

    return status;
  };

  changeHandler = e => {
    this.setState({
      search: e.target.value
    });
  };

  friendRequestHandler = (receiver_id, status) => {
    this.props.createFriendship(receiver_id, status);
    this.setState({ receiver: receiver_id });
  };

  render() {
    const { profiles, loading } = this.props.profile;
    const { friendships, f_loading } = this.props.friendship;
    const { errors } = this.props;

    let profilesContent;
    let searchContent;
    let f_status = [];

    if (profiles === null || loading) {
      profilesContent = <Loader />;
    } else {
      if (friendships === null || f_loading) {
        profilesContent = <Loader />;
      } else {
        searchContent = (
          <div className="form-wrapper">
            <div className="content-block">
              <div className="search-form">
                <InputFieldset
                  label="Search for friends"
                  name="search"
                  value={this.state.search}
                  onChange={this.changeHandler}
                  placeholder="Search"
                  error={errors.search}
                />
              </div>
            </div>
            <div className="content-block">
              <h5 className="grey">
                <i className="fas fa-image icon-in-title" />
                Add Friends
              </h5>
            </div>
          </div>
        );
        if (profiles.length > 0) {
          profilesContent = profiles
            .filter(this.searchingFor(this.state.search))
            .map((profile, i) => (
              <div className="friend-content" key={i}>
                <div className="friend-container">
                  <img
                    src={init.uploadAvatarPath + profile.avatar}
                    alt=""
                    className="profile-photo-md float-left"
                  />
                  <div className="friend-detail">
                    <div className="user-info">
                      <h5>
                       {profile.user.username}
                      </h5>
                      <div className="friend-action">
                        <div className="d-none">
                          {
                            (f_status = this.findFrienshipStatus(
                              profile.user._id
                            ))
                          }
                        </div>
                        {f_status.map((status, i) => (
                          <button
                            key={i}
                            onClick={this.friendRequestHandler.bind(
                              this,
                              profile.user._id,
                              consts.friendshipsAction[status]
                            )}
                            type="button"
                            className={classnames('btn btn-primary mr-1', {
                              disabled: consts.friendshipsAction[status] == null
                            })}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ));
        } else {
          profilesContent = <h4>No profiles found...</h4>;
        }
      }
    }

    return (
      <div className="container">
        <div id="page-contents">
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-7">
              <h2 className="text-green text-center">Add Friend</h2>
              {searchContent}
              {profilesContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddFriend.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  getAllFriendships: PropTypes.func.isRequired,
  createFriendship: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  friendship: PropTypes.object.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  friendship: state.friendship,
  profile: state.profile,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getProfiles, createFriendship, getAllFriendships }
)(AddFriend);
