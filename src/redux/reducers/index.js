import { combineReducers } from 'redux';
import auth from './auth';
import adminAuth from './adminAuth';
import message from './message';

export default combineReducers({
  auth,
  message,
  adminAuth,
});
