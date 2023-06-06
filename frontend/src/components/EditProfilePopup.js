import React, { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { AppContext } from '../contexts/AppContext.js';
import { useFormAndValidation } from '../hooks/useFormAndValidation.js'

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const context = useContext(AppContext);
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation()

  useEffect(() => {
    resetForm();
    setValues({
      name: context.currentUser.name,
      about: context.currentUser.about
    });
  }, [context.currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values.name, values.about);
  }

  return (
    <PopupWithForm
      name='popup-edit'
      title='Редактировать профиль'
      isOpen={isOpen}
      submitText='Сохранить'
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}>
      <input value={values.name || ''} onChange={handleChange} id="text-input-name" name="name" type="text" className={`popup__input-text ${errors.name ? 'popup__input-text_type_error' : ''}`} placeholder="Имя" minLength="2" maxLength="30" required />
      <span className={`popup__input-text-error ${errors.name ? 'popup__input-text-error_active' : ''}`}>{errors.name}</span>
      <input value={values.about || ''} onChange={handleChange} id="text-input-about" name="about" type="text" className={`popup__input-text ${errors.about ? 'popup__input-text_type_error' : ''}`} placeholder="Профессия" minLength="2" maxLength="200" required />
      <span className={`popup__input-text-error ${errors.about ? 'popup__input-text-error_active' : ''}`}>{errors.about}</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
