import React, { useEffect, useState, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';

export const CreatePage = () => {
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState('');

  useEffect(() => {
    if (window.M) {
      window.M.updateTextFields();
    }
  });

  const pressHandler = async (e) => {
    if (e.key === 'Enter') {
      try {
        const data = await request(
          '/api/link/generate',
          'POST',
          {
            from: link,
          },
          { Authorization: `Bearer ${auth.token}` }
        );
        console.log(data);
      } catch (e) {}
    }
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
        <div className="input-field">
          <input
            type="text"
            id="link"
            name="link"
            placeholder="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
            required
          />
          <label htmlFor="link">Enter the link</label>
        </div>
      </div>
    </div>
  );
};
