import { GET_FRIENDSHIPS, FRIENDSHIP_LOADING } from '../actions/actionTypes';

const initialState = {
  friendships: [],
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
    default:
      return state;
  }
}
