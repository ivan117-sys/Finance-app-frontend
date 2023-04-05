import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  incomeId: null,
  expenseId: null,
  token: null,
  name: null,
  removeIncomesHandler: () => {},
  login: () => {},
  logout: () => {},
});
