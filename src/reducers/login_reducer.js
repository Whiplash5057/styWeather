import { SET_LOGIN } from '../actions';
import _ from 'lodash';

export default function(state = { login: false, user: { displayName:'', photoURL:'' } }, action) {
  switch (action.type) {
    case SET_LOGIN:
      // console.log('action payload', action.payload);
      return action.payload;
      break;

    default:
      // console.log('action payload', state);
      return state;
  }
}