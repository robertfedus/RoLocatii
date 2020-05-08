import React, { useState, useContext } from 'react';
import validator from 'email-validator';
import './../Register/Register.css';
import getCookie from './../getCookie';
import axios from 'axios';

const Login = (props) => {
  const [errorMessage, setMessage] = useState(null);
  if (getCookie('jwt')) window.location.href = `${window.location.origin}/`;

  const login = (event) => {
    event.preventDefault();

    if (!event.target.email.value) setMessage('Email-ul este obligatoriu.');
    else if (!validator.validate(event.target.email.value))
      setMessage('Email-ul este invalid.');
    else if (!event.target.password.value)
      setMessage('Parola este obligatorie.');
    else {
      const body = {
        email: event.target.email.value,
        password: event.target.password.value
      };
      let user;
      axios
        .post('https://rolocatii-back.herokuapp.com/api/v1/auth/login', body)
        .then((response) => {
          user = response.data.data.user;
          document.cookie = `name=${user.name}`;
          document.cookie = `email=${user.email}`;
          document.cookie = `jwt=${response.data.data.token}`;
          window.location.href = `${window.location.origin}/`;
        })
        .catch((error) => {
          console.log(error.response.data);
          setMessage(error.response.data.message);
        });
    }
  };

  return (
    <div className="register-page">
      <form onSubmit={login}>
        <h3>Intră în cont</h3>
        <input type="text" placeholder="E-mail" name="email" />
        <input type="password" placeholder="Parolă" name="password" />
        <span className="error-message">{errorMessage}</span>
        <input type="submit" value="Trimite" name="submit" />
      </form>
    </div>
  );
};

export default Login;
