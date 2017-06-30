import { combineReducers } from 'redux';
import reducer from './redux/reducer';

export const makeRootReducer = () => {
  return combineReducers ({
    todo: reducer
  })
};

export default makeRootReducer;
