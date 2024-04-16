// Esse reducer será responsável por tratar as informações da pessoa usuária
import { AnyAction } from 'redux';
import { USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',

};

function userReducer(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state, email: action.payload.email,
      };
    default:
      return state;
  }
}

export default userReducer;
