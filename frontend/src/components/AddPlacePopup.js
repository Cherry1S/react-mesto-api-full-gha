import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { useFormAndValidation } from '../hooks/useFormAndValidation.js'


function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation()

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values.place, values.link);
  }

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  return (
    <PopupWithForm
      name='popup-add'
      title='Новое место'
      isOpen={isOpen}
      submitText='Создать'
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}>
      <input value={values.place || ''} onChange={handleChange} id="text-input-place" name="place" type="text" className={`popup__input-text ${errors.place ? 'popup__input-text_type_error' : ''}`} placeholder="Название" required minLength="2" maxLength="30" />
      <span className={`popup__input-text-error ${errors.place ? 'popup__input-text-error_active' : ''}`}>{errors.place}</span>
      <input value={values.link || ''} onChange={handleChange} id="text-input-link" name="link" type="url" className={`popup__input-text ${errors.link ? 'popup__input-text_type_error' : ''}`} placeholder="Ссылка на изображение" required />
      <span className={`popup__input-text-error ${errors.link ? 'popup__input-text-error_active' : ''}`}>{errors.link}</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
