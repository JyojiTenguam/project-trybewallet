import { screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import rootReducer from './redux/reducers';
import walletReducer from './redux/reducers/wallet';
import userReducer from './redux/reducers/user';
import { loginUser, currenciesUser, expensesUser, USER_LOGIN, ADD_CURRENCIES, ADD_EXPENSE } from './redux/actions';
import { UserType, ExpenseType } from './types/types';
import { renderWithRouterAndRedux } from './tests/helpers/renderWith';
import store from './redux';

test('verificando se existe um input para email', () => {
  renderWithRouterAndRedux(
    <Provider store={ store }>
      <Login />
    </Provider>,
  );
  const inputEmail = screen.getByTestId('email-input');
  expect(inputEmail).toBeInTheDocument();
});

describe('Root Reducer', () => {
// Defina o estado inicial e a ação
  const initialState = {
    user: {
      email: 'test@example.com',
    },
    wallet: {
      currencies: [],
      expenses: [],
      editor: false,
      idToEdit: 0,
    },
  };

  const action = { type: 'DUMMY_ACTION' };

  // Teste
  test('Root Reducer combina corretamente os reducers de usuário e de carteira', () => {
    const combinedState = rootReducer(initialState, action);

    expect(combinedState).toEqual({
      user: userReducer(initialState.user, action),
      wallet: walletReducer(initialState.wallet, action),
    });
  });
});

describe('actions', () => {
  it('Deve criar uma ação para fazer login do usuário.', () => {
    const user: UserType = {
      email: 'test@test.com',
    };
    const expectedAction = {
      type: USER_LOGIN,
      payload: user,
    };
    expect(loginUser(user)).toEqual(expectedAction);
  });

  it('Deve criar uma ação para adicionar currencies.', () => {
    const currencies: string[] = ['USD', 'EUR'];
    const expectedAction = {
      type: ADD_CURRENCIES,
      payload: currencies,
    };
    expect(currenciesUser(currencies)).toEqual(expectedAction);
  });

  it('Deve criar uma ação para adicionar despesas.', () => {
    const expense: ExpenseType = {
      id: 1,
      value: '100',
      description: 'Test expense',
      currency: 'USD',
      method: 'Cash',
      tag: 'Food',
      exchangeRates: {},
    };
    const expectedAction = {
      type: ADD_EXPENSE,
      payload: expense,
    };
    expect(expensesUser(expense)).toEqual(expectedAction);
  });
});
