import axios from 'axios';

import {
  GET_IMAGES,
  IMAGE_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS
} from './actionTypes';

// Get images
export const getImages = () => dispatch => {
  dispatch(setImageLoading());
  axios
    .get('/api/album')
    .then(res =>
      dispatch({
        type: GET_IMAGES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_IMAGES,
        payload: null
      })
    );
};

// Get images by ID
export const getImagesByUserId = user_id => dispatch => {
  dispatch(setImageLoading());
  axios
    .get(`/api/album/user/${user_id}`)
    .then(res =>
      dispatch({
        type: GET_IMAGES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_IMAGES,
        payload: null
      })
    );
};

export const addImage = imageData => dispatch => {
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };

  dispatch(clearErrors());
  axios
    .post('/api/album', imageData, config)
    .then(res =>
      dispatch({
        type: GET_IMAGES,
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

// Delete Post
export const deleteImage = id => dispatch => {
  axios
    .delete(`/api/album/${id}`)
    .then(res =>
      dispatch({
        type: GET_IMAGES,
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

// Set loading state
export const setImageLoading = () => {
  return {
    type: IMAGE_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
