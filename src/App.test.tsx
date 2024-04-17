import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Login from './pages/Login';
import rootReducer from './redux/reducers';
import walletReducer from './redux/reducers/wallet';
import userReducer from './redux/reducers/user';
import { loginUser, currenciesUser, expensesUser, USER_LOGIN, ADD_CURRENCIES, ADD_EXPENSE } from './redux/actions';
import { UserType, ExpenseType } from './types/types';

// Função utilitária para criar uma store de teste com o rootReducer
function createTestStore() {
  return createStore(rootReducer);
}

const LOGIN_TEXT = 'Login';
const ENTER_TEXT = 'Entrar';

test('renderiza corretamente o componente de login', () => {
  const store = createTestStore();

  const { getByText, getByTestId } = render(
    <Provider store={ store }>
      <Login />
    </Provider>,
  );

  // Verifique se o título "Login" está presente
  expect(getByText(LOGIN_TEXT)).toBeInTheDocument();

  // Verifique se os campos de entrada de email e senha estão presentes
  expect(getByTestId('email-input')).toBeInTheDocument();
  expect(getByTestId('password-input')).toBeInTheDocument();

  // Verifique se o botão de submit está presente e inicialmente desabilitado
  const submitButton = getByText(ENTER_TEXT);
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toBeDisabled();
});

describe('Root Reducer', () => {
  it('Combina corretamente os reducers de usuário e de carteira.', () => {
    const initialState = {
      user: { email: 'test@example.com' },
      wallet: { balance: 0 } as never, // Update the type of wallet to 'never'
    };

    const action = { type: 'SOME_ACTION' };

    const combinedState = rootReducer(initialState, action);

    expect(combinedState).toEqual({
      user: userReducer(undefined, action),
      wallet: walletReducer(undefined, action),
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
