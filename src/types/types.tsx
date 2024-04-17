export type UserType = {
  email: string;
};

export type UserState = {
  user: UserType;
};

export type ExchangeRateType = {
  [key: string]: {
    code: string;
    codein: string;
    name: string;
    high: string;
    low: string;
    varBid: string;
    pctChange: string;
    bid: string;
    ask: string;
    timestamp: string;
    create_date: string;
  };
};

export type ApiRenponseType = {
  [key: string]: ExchangeRateType;
};

export type ExpenseType = {
  id: number;
  value: string;
  description: string;
  currency: string;
  method: string;
  tag: string;
  exchangeRates: ExchangeRateType;
};

export type StoreState = {
  user: {
    email: string;
  };
  wallet: {
    availableCurrencies: string[];
    expenses: ExpenseType[];
    exchangeRates: ExchangeRateType;
    editor: boolean;
    idToEdit: number;
  };
};

export type ConvertType = {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
};
