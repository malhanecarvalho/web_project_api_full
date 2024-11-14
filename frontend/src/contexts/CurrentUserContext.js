import Api from "../utils/api";
import React, { useState, useEffect, createContext } from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const isToken = localStorage.getItem("Triple10");
  const userId = localStorage.getItem("userId");

  const api = new Api({
    baseUrl: "https://api.kirakira.strangled.net/api",
    token: `${isToken}`,
    id: `${userId}`
  });

  const [userMe, setUserMe] = useState({});

  function reloadUser() {
    api
      .getUserMe()
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((data) => {
        setUserMe(data.user)
      })
      .catch((err) => {
        console.log("Quebrou no GET /userMe");
        console.log(`Error: ${err}`);
      });
  }

  useEffect(() => {
      reloadUser();
  }, []);

  function onProfileInfo(evt) {
    api
      .userEdit(evt.title, evt.about)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((data) => {
        setUserMe(data.user);
      })
      .catch((err) => {
        console.log("Quebrou no GET /user");
        console.log(`Error: ${err}`);
        setUserMe([]);
      });
  }

  function onProfileInfoAvatar(evt) {
    api
      .editAvatar({ avatar: evt.image })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((data) => {
        setUserMe(data);
      })
      .catch((err) => {
        console.log("Quebrou no GET /users");
        console.log(`Error: ${err}`);
        setUserMe([]);
      });
  }

  function onUpdateUser(evt) {
    api
      .userEdit(evt.title, evt.about)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((data) => {
        setUserMe(data);
      })
      .catch((err) => {
        console.log("Quebrou no GET /cards");
        console.log(`Error: ${err}`);
        setUserMe([]);
      });
  }

  function onUpdateAvatar(evt) {
    api
      .editAvatar({ avatar: evt.image })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((data) => {
        setUserMe(data);
      })
      .catch((err) => {
        console.log("Quebrou no GET /users");
        console.log(`Error: ${err}`);
        setUserMe([]);
      });
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser: userMe, setUserMe, onProfileInfoAvatar, onProfileInfo, onUpdateUser, onUpdateAvatar }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
