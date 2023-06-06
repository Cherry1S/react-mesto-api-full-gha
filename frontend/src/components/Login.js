import React from 'react';
import AuthForm from './AuthForm.js'

function Login({ onSubmit }) {
  const handleSubmit = (email, password) => {
    if (!email || !password){
      return;
    }
    onSubmit(email, password)
  }

  return (
    <AuthForm
      onSubmit={handleSubmit}
      welcome='Вход'
      submitText='Войти'>
    </AuthForm>
  );
}

export default Login
