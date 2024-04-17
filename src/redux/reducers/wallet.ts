// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { AnyAction } from 'redux';
import { ADD_CURRENCIES, ADD_EXPENSE, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function walletReducer(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case ADD_CURRENCIES:
      return { ...state, currencies: action.payload };
    case ADD_EXPENSE:
      return { ...state, expenses: [...state.expenses, action.payload] };
    case DELETE_EXPENSE:
      return { ...state,
        expenses: action.payload };
    default: return state;
  }
}

export default walletReducer;
