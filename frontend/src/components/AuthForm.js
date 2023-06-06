import React, { useState } from 'react';

function AuthForm({ welcome, submitText, onSubmit, children }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValue.email, formValue.password);
    setFormValue({email: '', password: ''});
  }

  return (
    <div className="authform">
      <p className="authform__welcome">
        {welcome}
      </p>
      <form onSubmit={handleSubmit} className="authform__form">
        <input id="email" name="email" type="email" value={formValue.email} onChange={handleChange} className="authform__input" placeholder='Email' />
        <input id="password" name="password" type="password" value={formValue.password} onChange={handleChange} className="authform__input" placeholder='Пароль' />
        <div className="authform__button-container">
          <button type="submit" onSubmit={handleSubmit} className="authform__link">{submitText}</button>
        </div>
      </form>
      {children}
    </div>
  );
}

export default AuthForm
