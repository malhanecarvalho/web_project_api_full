class Api {
  constructor({ baseUrl, token, id, headers }) {
    this.baseUrl = baseUrl;
    this.token = token;
    this.id = id;
    this.headers = headers;
  }

  getUser() {
    return fetch(`${this.baseUrl}/users`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${this.token}`,
      },
    });
  }

  getUserMe() {
    if (!this.id || this.id === "") {
      return Promise.reject("id inválido ou vazio");
    }
    return fetch(`${this.baseUrl}/users/me/${this.id}`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${this.token}`,
      },
    });
  }

  userEdit(title, about) {
    return fetch(`${this.baseUrl}/users/me/${this.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({
        name: title,
        about: about,
      }),
    });
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${this.token}`,
      },
    });
  }

  createCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...this.headers,
        authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    });
  }

  Update(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        ...this.headers,
        authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        ...this.headers,
        authorization: `Bearer ${this.token}`,
      },
    });
  }

  addLikes(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        ...this.headers,
        authorization: `Bearer ${this.token}`,
      },
    });
  }

  removeLikes(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        ...this.headers,
        authorization: `Bearer ${this.token}`,
      },
    });
  }

  editAvatar({ avatar }) {
    return fetch(`${this.baseUrl}/users/me/${this.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        ...this.headers,
        authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({ avatar: avatar }),
    });
  }
};

export default Api;