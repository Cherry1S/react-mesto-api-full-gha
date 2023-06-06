import closeButton from '../images/CloseButton.svg';
import registerOk from '../images/RegisterOk.svg';
import registerError from '../images/RegisterError.svg';

function InfoTooltip({ isOpen, onClose, isRegisterOk }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__tooltip-container">
        <button type="button" className="popup__close button-transparent" id="image-close-button" onMouseDown={onClose}><img
          className="popup__close-icon" src={closeButton} alt="Кнопка «Закрыть»" /></button>
        <img src={isRegisterOk ? registerOk : registerError} alt='Результат регистрации' />
        <p>{isRegisterOk ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
