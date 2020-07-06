import { v4 as uuid } from 'uuid';
import { UPDATE, CREATE, SIGNIN, SIGNOUT, LOADED } from './constants';

export const signin = (orders = []) => {
  return {
    type: SIGNIN,
    orders,
  }
};


export const loadingDone = () => {
  return {
    type: LOADED,
  }
};


