import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';
import friendshipReducer from './friendshipReducer';
import albumReducer from './albumReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  post: postReducer,
  friendship: friendshipReducer,
  album: albumReducer,
  errors: errorReducer
});
