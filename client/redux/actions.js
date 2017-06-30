

import {SET_TODO, EDIT_TODO, UPDATE_TODO, CHANGE_TODO_VALUE, FILTER_ACTIVE, FILTER_DONE, FILTER_ALL, FILTER_SEARCH} from './constants';
export const setTodo = (payload) => {
  return {type: SET_TODO, payload}
};
export const editTodo = ({index, todo}) => {
  return {type: EDIT_TODO, payload: {index, todo}}
};
export const updateTodo = ({index, todo}) => {
  return {type: UPDATE_TODO, payload: {index, todo}}
};
export const changeTodoValue = (value) => {
  return {type: CHANGE_TODO_VALUE, payload: value}
};
export const filterDone = () => {
  return {type: FILTER_DONE}
};
export const filterActive = () => {
  return {type: FILTER_ACTIVE}
};
export const filterActive = () => {
  return {type: FILTER_ACTIVE}
};
export const filterSeatch = () => {
  return {type: FILTER_SEARCH, value}
}
