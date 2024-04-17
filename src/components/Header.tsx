import { useSelector } from 'react-redux';
import { ExpenseType, StoreState } from '../types/types';

function Header() {
  const userData = useSelector((state: StoreState) => ({ ...state.user }));
  const expenses = useSelector((state: StoreState) => state.wallet.expenses);

  const convert = (data: ExpenseType) => {
    const exchangeRatesBRL = parseFloat(data.exchangeRates[data.currency]
      .ask) * parseFloat(data.value);
    return exchangeRatesBRL;
  };

  return (
    <header>
      <h1> TrybeWallet</h1>
      <p data-testid="email-field">
        {`Email: ${userData.email}`}
      </p>
      <p data-testid="total-field">
        {expenses.reduce((acc, data) => acc + convert(data), 0).toFixed(2)}
      </p>
      <p data-testid="header-currency-field"> BRL</p>
    </header>
  );
}

export default Header;
