class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then(this._handleResponse);
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then(this._handleResponse);
  }

  changeUserInfo(newName, newAbout) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    })
      .then(this._handleResponse);
  }

  addCard(cardName, cardLink) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
      .then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then(this._handleResponse);
  }

  changeAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        avatar: avatarLink,
      })
    })
      .then(this._handleResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      })
        .then(this._handleResponse)
    } else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      })
        .then(this._handleResponse);
    }
  }
}

// const api = new Api({
//   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
//   headers: {
//     authorization: 'fe2506e1-5260-4f6d-bc3e-c28fd341c579',
//     'Content-Type': 'application/json',
//   },
// });
const api = new Api({
  baseUrl: 'https://api.cherry.nomoredomains.rocks',
});

export default api


