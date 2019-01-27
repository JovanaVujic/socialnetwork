import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE, 
  IS_FRIENDSHIPS
} from '../actions/actionTypes';

const initialState = {
  profile: null,
  profiles: null,
  isFriends: false,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case IS_FRIENDSHIPS:
      return {
        ...state,
        isFriends: action.payload,
        loading: false
      }
    default:
      return state;
  }
}
