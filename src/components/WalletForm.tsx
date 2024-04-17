import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { expensesUser, currenciesUser } from '../redux/actions';
import { ExchangeRateType, ExpenseType } from '../types/types';
import fetchCurrencies from '../services/currencies';

function WalletForm() {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [method, setMethod] = useState('Dinheiro');
  const [tag, setTag] = useState('Alimentação');
  const [currencies, setCurrencies] = useState<string[] | null>(null);
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  const [data, setData] = useState<ExchangeRateType>({});
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((responseData) => {
        delete responseData.USDT;
        setData(responseData);
        const curr = Object.keys(responseData);
        setCurrencies(curr);
        dispatch(currenciesUser(curr));
      })
      .catch((error) => {
        console.error('Erro ao obter moedas:', error);
      });
  }, [dispatch]);

  const handlers = {
    metodopagamento: setMethod,
    tag: setTag,
    moeda: setCurrency,
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const handler = handlers[event.target.name as keyof typeof handlers];
    if (handler) {
      handler(event.target.value);
    }
  };

  const createNewExpense = () => {
    const id = expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 0;
    return {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: data,
    };
  };

  const clearFormFields = () => {
    setValue('');
    setDescription('');
    fetchCurrencies();
  };

  const handleAddExpense = (event: React.FormEvent) => {
    event.preventDefault();
    const newExpense = createNewExpense();

    setExpenses([...expenses, newExpense]);
    dispatch(expensesUser(newExpense));
    clearFormFields();
  };

  if (currencies === null) {
    return <div>Carregando moedas...</div>;
  }

  return (
    <form onSubmit={ handleAddExpense }>
      <label>
        Valor da despesa:
        <input
          data-testid="value-input"
          type="number"
          name="valordespesa"
          value={ value }
          onChange={ (event) => setValue(event.target.value) }
        />
      </label>
      <label>
        Descrição da despesa:
        <input
          data-testid="description-input"
          type="text"
          name="descricaodespesa"
          value={ description }
          onChange={ (event) => setDescription(event.target.value) }
        />
      </label>
      <label>
        Moeda:
        <select
          name="moeda"
          data-testid="currency-input"
          value={ currency }
          onChange={ handleChange }
        >
          {currencies.map((curr) => (
            <option key={ curr } value={ curr }>
              {curr}
            </option>
          ))}
        </select>
      </label>
      <label>
        Método de pagamento:
        <select
          data-testid="method-input"
          name="metodopagamento"
          value={ method }
          onChange={ handleChange }
        >
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
          <option value="Dinheiro">Dinheiro</option>
        </select>
      </label>
      <label>
        Tag:
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
      <button type="submit">Adicionar despesa</button>
    </form>
  );
}

export default WalletForm;
