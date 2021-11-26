import { combineReducers } from 'redux';
import auth from './auth';
import adminAuth from './adminAuth';
import adminReducer from './adminBoard';
import message from './message';

export default combineReducers({
  auth,
  message,
  adminAuth,
  adminboard: adminReducer,
});
