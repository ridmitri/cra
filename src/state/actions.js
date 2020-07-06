import { v4 as uuid } from 'uuid';
import { UPDATE, CREATE, SIGNIN, SIGNOUT, LOADED } from './constants';

export const signin = (orders = []) => {
  return {
    type: SIGNIN,
    orders,
  }
};

export const update = (order) => {
  return {
    type: UPDATE,
    order,
  }
};

export const createOrder = (order) => {
  return {
    type: CREATE,
    order,
  }
};

export const loadingDone = () => {
  return {
    type: LOADED,
  }
};
