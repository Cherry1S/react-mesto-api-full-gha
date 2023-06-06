import React, { useContext } from 'react';
import avatarButton from '../images/AvatarButton.svg';
import editButton from '../images/EditButton.svg';
import addButton from '../images/AddButton.svg';
import Card from './Card.js';
import { AppContext } from '../contexts/AppContext.js';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {
  const context = useContext(AppContext);

  return (
    <main className="content page__content">
      <section className="profile content__profile">
        <div className="profile__info">
          <button type="button" className="profile__avatar-button button-transparent" onMouseDown={onEditAvatar}>
            <img className="profile__image" src={context.currentUser.avatar} alt="Аватар" draggable="false" />
            <img className="profile__pencil" src={avatarButton} alt="Кнопка редактирования" draggable="false" />
          </button>
          <div className="profile__info-textbox">
            <h1 className="profile__title">{context.currentUser.name}</h1>
            <button className="profile__edit-button button-transparent" type="button" onMouseDown={onEditProfile}><img
              className="profile__edit-button-image" src={editButton}
              alt="Кнопка «Редактировать»" /></button>
            <p className="profile__about">{context.currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button button-transparent" type="button" onMouseDown={onAddPlace}><img className="profile__add-button-image"
          src={addButton} alt="Кнопка «Добавить»" /></button>
      </section>
      <section className="elements content__elements">
        <ul className="elements__grid">
          {cards.map((card) => (
            <Card card={card} onCardLike={onCardLike} onCardDelete={onCardDelete} onCardClick={onCardClick} key={card._id} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;


