import { createContext } from 'react';

function noop() {}

export const AuthContext = createContext({
  user: {},
  login: noop,
  logout: noop,
  isAuthenticated: false,
});
