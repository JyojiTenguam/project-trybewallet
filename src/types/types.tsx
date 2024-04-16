export type UserType = {
  email: string;
};

export type UserState = {
  user: UserType;
};

type ExchangeRateType = {
  ask: string;
  name: string;
};

export type ExpenseType = {
  id: number;
  value: string;
  description: string;
  currency: string;
  method: string;
  tag: string;
  exchangeRates: Record<string, ExchangeRateType>;
};

export type StoreState = {
  user: {
    email: string;
  };
  wallet: {
    availableCurrencies: string[];
    expenses: ExpenseType[];
    editor: boolean;
    idToEdit: number;
  };
};