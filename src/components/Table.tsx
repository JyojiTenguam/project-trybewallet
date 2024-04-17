import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteExpense } from '../redux/actions';
import { ExpenseType, StoreState } from '../types/types';

function Table() {
  const expenses = useSelector((state: StoreState) => state.wallet.expenses);
  const dispatch = useDispatch();

  const handleDeleteExpense = (expenseId: string) => {
    const filterExpense = expenses.filter((expense: ExpenseType) => (expense
      .id) !== parseFloat(expenseId));
    dispatch(deleteExpense(filterExpense));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={ expense.id }>
            <td>{expense.description}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            <td>{parseFloat(expense.value).toFixed(2)}</td>
            <td>{expense.currency}</td>
            <td>{parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
            <td>
              {(parseFloat(expense.exchangeRates[expense.currency].ask)
              * parseFloat(expense.value)).toFixed(2)}
            </td>
            <td>{expense.exchangeRates[expense.currency].name}</td>
            <td>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => handleDeleteExpense(String(expense.id)) }
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
