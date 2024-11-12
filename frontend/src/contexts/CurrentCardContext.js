import Api from "../utils/api";
import React, { useState, useEffect, createContext } from "react";

export const CurrentCardContext = createContext();

export const CurrentCardProvider = ({ children }) => {
  const isToken = localStorage.getItem("Triple10");
  const userId = localStorage.getItem("userId");

  const api = new Api({
    baseUrl: "http://localhost:3001",
    token: `${isToken}`,
    id: `${userId}`
  });

  const [cards, setCards] = useState([]);

  useEffect(() => {
    reloadCards().then((data) => {
      setCards(data);
    });
  }, []);

  function reloadCards() {
    return api
      .getInitialCards()
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log("Quebrou no GET /cards");
        console.log(`Error: ${err}`);
      });
  };


  function handleSubmit(card, owner) {
    const dataCard = {
      createdAt: new Date(),
      likes: [],
      link: card.url,
      name: card.title,
      owner: owner,
    };

    api
      .createCard(dataCard)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((data) => {
        setCards([data, ...cards]);
      })
      .catch((err) => {
        console.log("Quebrou no POST /cards");
        console.log(`Error: ${err}`);
        setCards([]);
      });
  }

  function addLike(cardId) {
    api
      .addLikes(cardId)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((newCard) => {
        setCards((state) =>
          state.map((c) =>
            c._id === cardId ? { ...c, likes: newCard.docs.likes } : c
          )
        );

      })
      .catch((err) => {
        console.log(`Quebrou no LIKED /cards/${cardId}`);
        console.log(`Error: ${err}`);
      });
  }

  function removeLike(cardId) {
    api
      .removeLikes(cardId)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((newCard) => {
        setCards((state) =>
          state.map((c) =>
            c._id === cardId ? { ...c, likes: newCard.docs.likes } : c
          )
        );
      })
      .catch((err) => {
        console.log(`Quebrou no LIKED /cards/${cardId}`);
        console.log(`Error: ${err}`);
      });
  }

  function handleDelete(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards(cards.filter((card) => card._id !== cardId));
      })
      .catch((err) => {
        console.log(`Quebrou no DELETE /cards/${cardId}`);
        console.log(`Error: ${err}`);
      });
  }

  return (
    <CurrentCardContext.Provider value={{ cards, setCards, addLike, removeLike, handleSubmit, handleDelete, reloadCards }}>
      {children}
    </CurrentCardContext.Provider>
  );
};
