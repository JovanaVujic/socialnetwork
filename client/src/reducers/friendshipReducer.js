import { GET_FRIENDSHIPS, FRIENDSHIP_LOADING, IS_FRIENDSHIPS } from '../actions/actionTypes';

const initialState = {
  friendships: [],
  isFriends: null,
  f_loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FRIENDSHIP_LOADING:
      return {
        ...state,
        f_loading: true
      };
    case GET_FRIENDSHIPS:
      return {
        ...state,
        friendships: action.payload,
        f_loading: false
      };
    case IS_FRIENDSHIPS:
      return {
        ...state,
        isFriends: action.payload
      }
    default:
      return state;
  }
}
