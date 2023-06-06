import React, { useContext } from 'react';
import deleteButtonImg from '../images/DeleteButton.svg';
import { AppContext } from '../contexts/AppContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const context = useContext(AppContext);
  const isOwn = card.owner._id === context.currentUser._id;
  const isLiked = card.likes.some(like => like._id === context.currentUser._id);
  const cardLikeButtonClassName = (
    `elements__card-like button-transparent ${isLiked && 'elements__card-like_active'}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }



  return (
    <li className="elements__card">
      {isOwn && <button className="elements__delete-button button-transparent elements__delete-button_active" type="button" onMouseDown={handleDeleteClick}><img
        src={deleteButtonImg} alt="Кнопка «Удалить»" /></button>}
      <img className="elements__card-image" src={card.link} alt={`Изображение ${card.name}`} onMouseDown={handleClick} />
      <div className="elements__text-container">
        <h2 className="elements__card-text">{card.name}</h2>
        <div>
          <button className={cardLikeButtonClassName} onMouseDown={handleLikeClick} type="button"></button>
          <p className="elements__likes-number">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
