import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions';
import { UserType } from '../types/types';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValidForm()) {
      dispatch(loginUser({ email } as UserType));
      navigate('/carteira');
    }
  };

  const isValidForm = () => {
    const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    const isValidPassword = password.length >= 6;
    return isValidEmail && isValidPassword;
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={ handleSubmit }>
        <input
          type="email"
          name="email"
          value={ email }
          onChange={ handleChange }
          placeholder="Digite seu email"
          data-testid="email-input"
        />
        <input
          type="password"
          name="password"
          value={ password }
          onChange={ handleChange }
          placeholder="Digite sua senha"
          data-testid="password-input"
        />
        <button disabled={ !isValidForm() } type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
