import { UserType, ExpenseType } from '../../types/types';

export const USER_LOGIN = 'USER_LOGIN';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const loginUser = (user: UserType) => ({
  type: 'USER_LOGIN',
  payload: user,
});

export const currenciesUser = (currencies: string[]) => ({
  type: 'ADD_CURRENCIES',
  payload: currencies,
});

export const expensesUser = (expenses: ExpenseType) => ({
  type: 'ADD_EXPENSE',
  payload: expenses,
});

export const deleteExpense = (expenseId: ExpenseType[]) => ({
  type: 'DELETE_EXPENSE',
  payload: expenseId,
});
