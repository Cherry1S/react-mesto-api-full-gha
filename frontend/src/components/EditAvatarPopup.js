import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { useFormAndValidation } from '../hooks/useFormAndValidation.js'

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarLink = useRef();
  const { handleChange, errors, isValid, resetForm } = useFormAndValidation()

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarLink.current.value);
  }

  useEffect(() => {
    resetForm()
    avatarLink.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      name='popup-avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      submitText='Сохранить'
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}>
      <input ref={avatarLink} onChange={handleChange} id="text-input-avatar" name="avatar" type="url" className={`popup__input-text ${errors.avatar ? 'popup__input-text_type_error' : ''}`} placeholder="Ссылка на изображение" required />
      <span id="avatar-span" className={`popup__input-text-error ${errors.avatar ? 'popup__input-text-error_active' : ''}`}>{errors.avatar}</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
