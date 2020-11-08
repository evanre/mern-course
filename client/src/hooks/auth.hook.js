import { useState, useEffect, useCallback } from 'react';
import { useHttp } from './http.hook';
import { useMessage } from './message.hook';

const storageName = 'userData';

export const useAuth = () => {
  const { request } = useHttp();
  const message = useMessage();
  const [user, setUser] = useState({});

  const login = useCallback((usr) => {
    setUser(usr);

    localStorage.setItem(storageName, JSON.stringify(usr));
  }, []);

  const logout = useCallback(() => {
    setUser({});
    localStorage.removeItem(storageName);
    message('Logged Out!');
  }, []);

  // Did mount
  useEffect(() => {
    const { token, id } = JSON.parse(localStorage.getItem(storageName)) || {};

    if (!token) return;

    request('/api/auth', 'GET', null, {
      Authorization: `Bearer ${token}`,
    })
      .then((res) => {
        login({ token, id });
      })
      .catch((e) => {
        logout();
      });
  }, [login, logout, request]);

  return { login, logout, user };
};
