import uuid from 'uuid/v4';
import { UPDATE, CREATE, SIGNIN, SIGNOUT } from './constants';

export const signin = (orders = []) => {
  return {
    type: SIGNIN,
    orders,
  }
};


