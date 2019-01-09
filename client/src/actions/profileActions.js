import axios from 'axios';

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_PROFILES
} from './actionTypes';

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

export const getProfileByUserId = id => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/user/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// Get all friends profile
export const getFriendsProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/friends')
    .then(res => 
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

export const createBasicInfo = (newProfile, history) => dispatch => {
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };

  axios
    .post('/api/profile/basic-info', newProfile, config)
    .then(res => history.push(`/timeline-about/${res.data.user}`))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const createWorkExperience = newProfile => dispatch => {
  axios
    .post('/api/profile/experience', newProfile)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const createSocials = (newProfile, history) => dispatch => {
  axios
    .post('/api/profile/socials', newProfile)
    .then(res => history.push(`./timeline-about/${res.data.user}`))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const createInterests = (newProfile, history) => dispatch => {
  axios
    .post('/api/profile/interests', newProfile)
    .then(res => history.push(`./timeline-about/${res.data.user}`))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure?'))
    axios
      .delete('/api/profile')
      .then(res => 
          dispatch({
            type: SET_CURRENT_USER,
            payload: {}
          })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
};

// Delete Experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => dispatch => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
