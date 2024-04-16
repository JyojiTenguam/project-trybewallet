import React from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../types/types';

function Header() {
  const { email } = useSelector((state: StoreState) => state.user);

  return (
    <div className="header-container">
      <h1>TrybeWallet</h1>
      <div className="email-container">
        <span>Email: </span>
        <span data-testid="email-field">{email}</span>
      </div>
      <div className="total-container">
        <span>Total de despesas: </span>
        <span data-testid="total-field">0</span>
      </div>
      <div className="currency-container" data-testid="header-currency-field">BRL</div>
    </div>
  );
}

export default Header;
