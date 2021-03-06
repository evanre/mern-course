import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
// import { useWhyDidYouUpdate } from '../hooks/didUpdate.hook';
import { AuthContext } from '../context/AuthContext';

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({ email: '', password: '' });

  // useWhyDidYouUpdate('AuthPage', [error, message, clearError]);

  useEffect(() => {
    if (error) {
      message(error);
      clearError();
    }
  }, [error, message, clearError]);

  useEffect(() => {
    if (window.M) {
      window.M.updateTextFields();
    }
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const { token, userId } = await request('/api/auth/login', 'POST', {
        ...form,
      });
      auth.login({ token, id: userId });
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-3">
        <h1>Shorten the link</h1>
        <form
          className="card blue darken-1"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div className="input-field">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                className="yellow-input"
                onChange={changeHandler}
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                className="yellow-input"
                onChange={changeHandler}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              onClick={loginHandler}
              style={{ marginRight: 10 }}
              disabled={loading}
            >
              Sign In
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
