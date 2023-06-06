import closeButton from '../images/CloseButton.svg';

function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} id={props.name}>
      <div className="popup__container">
        <button type="button" className="popup__close button-transparent" onMouseDown={props.onClose}><img
          className="popup__close-icon" src={closeButton} alt="Кнопка «Закрыть»" /></button>
        <h2 className="popup__title">{props.title}</h2>
        <form onSubmit={props.onSubmit} className="popup__form" name={props.name} noValidate>
          {props.children}
          <button type="submit" className={`popup__submit ${props.isValid ? '' : 'popup__submit_disabled'}`} disabled={!props.isValid} id={props.submitId}>{props.submitText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
