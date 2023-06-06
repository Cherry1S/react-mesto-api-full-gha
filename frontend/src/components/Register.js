import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm.js'

function Register({ onSubmit }) {

  const handleSubmit = (email, password) => {
    onSubmit(email, password)
  }

  return (
    <AuthForm
      onSubmit={handleSubmit}
      welcome='Регистрация'
      submitText='Зарегистрироваться'>
      <div className="authform__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="/sign-in" className="authform__login-link">Войти</Link>
      </div>
    </AuthForm>
  );
}

export default Register
