import axios from 'axios';
import { GET_FRIENDSHIPS, FRIENDSHIP_LOADING, IS_FRIENDSHIPS } from './actionTypes';

export const getAllFriendships = () => dispatch => {
  dispatch(setFriendshipLoading());
  axios
    .get('/api/friendships/all')
    .then(res =>
      dispatch({
        type: GET_FRIENDSHIPS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_FRIENDSHIPS,
        payload: null
      })
    );
};

export const getFriends = () => dispatch => {
  dispatch(setFriendshipLoading());
  axios
    .get('/api/friendships/friends')
    .then(res =>
      dispatch({
        type: GET_FRIENDSHIPS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_FRIENDSHIPS,
        payload: null
      })
    );
};

export const getFriendsByUser = user_id => dispatch => {
  dispatch(setFriendshipLoading());
  axios
    .get(`/api/friendships/friends/user/${user_id}`)
    .then(res =>
      dispatch({
        type: GET_FRIENDSHIPS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_FRIENDSHIPS,
        payload: null
      })
    );
};

export const isFriends = user_id => dispatch => {
  dispatch(setFriendshipLoading());
  axios
    .get(`/api/friendships/friends/users/${user_id}}`)
    .then(res =>
      dispatch({
        type: IS_FRIENDSHIPS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: IS_FRIENDSHIPS,
        payload: false
      })
    );
};

export const createFriendship = (user_id, status) => dispatch => {
  axios
    .post(`/api/friendships/user/${user_id}/status/${status}`)
    .then(res =>
      dispatch({
        type: GET_FRIENDSHIPS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_FRIENDSHIPS,
        payload: null
      });
    });
};

export const setFriendshipLoading = () => {
  return {
    type: FRIENDSHIP_LOADING
  };
};
