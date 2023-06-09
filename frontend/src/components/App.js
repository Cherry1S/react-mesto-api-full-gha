import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header.js'
import Main from './Main.js'
import Login from './Login.js'
import Register from './Register.js'
import PopupWithForm from './PopupWithForm.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import Footer from './Footer.js'
import api from '../utils/Api.js';
import ImagePopup from './ImagePopup';
import { AppContext } from '../contexts/AppContext.js';
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from './InfoTooltip.js';
import * as auth from '../utils/auth.js'

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [isRegisterOk, setIsRegisterOk] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');
  const [cards, setCards] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    tokenCheck();
  }, [])

  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt')
      auth.getContent(jwt)
        .then((res) => {
          if (res.email) {
            setCurrentEmail(res.email)
            setLoggedIn(true)
            navigate('/')
          }
        })
        .catch((err) => {
          console.log(err)
        });
    }
  }

  useEffect(() => {
    Promise.all([
      api.getInitialCards(),
      api.getUser()
    ])
      .then((pageData) => {
        setCards(pageData[0]);
        setCurrentUser(pageData[1]);
      })
      .catch((err) => {
        console.log(err)
      });
  }, [isLoggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err)
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err)
      });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleUpdateUser(newName, newDescription) {
    api.changeUserInfo(newName, newDescription)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleUpdateAvatar(avatarLink) {
    api.changeAvatar(avatarLink)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleAddPlaceSubmit(newCardName, newCardLink) {
    api.addCard(newCardName, newCardLink)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeleteCardPopupOpen(false);
    setImagePopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  const showInfoTooltip = (isOk) => {
    setIsRegisterOk(isOk)
    setInfoTooltipPopupOpen(true);
  }

  const handleLoginSubmit = (email, password) => {
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          setCurrentEmail(email)
          setLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch(err => console.log(err));
  }

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/sign-in');
  }


  const handleRegisterSubmit = (email, password) => {
    auth.register(email, password)
      .then(() => {
        showInfoTooltip(true)
        navigate('/sign-in', { replace: true })
      })
      .catch((err) => {
        showInfoTooltip(false)
        console.log(err)
      })
  }


  return (
    <AppContext.Provider value={{ currentUser, isLoggedIn }}>
      <div className="page">
        <div className="page__container">
          <Header handleLogout={handleLogout} email={currentEmail} />
          <Routes>
            <Route path="/" element={<ProtectedRoute element={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete} />}
            />
            <Route path="/sign-up" element={<Register onSubmit={handleRegisterSubmit} />} />
            <Route path="/sign-in" element={<Login onSubmit={handleLoginSubmit} />} />
          </Routes>
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <PopupWithForm
            name='popup-delete'
            title='Вы уверены?'
            isOpen={isDeleteCardPopupOpen}
            submitText='Да'
            submitId='delete-confirm'
            onClose={closeAllPopups}>
          </PopupWithForm>

          <ImagePopup
            selectedCard={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />
          <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} isRegisterOk={isRegisterOk} />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
