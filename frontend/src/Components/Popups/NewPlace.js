import iconClose from "../../images/close-icon.png";
import React from "react";
import { useState, useEffect } from "react";
import { CurrentCardContext } from "../../contexts/CurrentCardContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function NewPlace({ onClose, classPopupAddPlace }) {

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageURL, setErrorMessageURL] = useState("");
  const [disabledButtonAddSubmit, setDisabledButtonAddSubmit] = useState(true);
  const classButtonAddSubmit = disabledButtonAddSubmit ? "popup-add__button_disabled" : "";
  const { handleSubmit } = React.useContext(CurrentCardContext);
  const { currentUser } = React.useContext(CurrentUserContext);
  const regexUrl = /^(?:https?:\/\/)?(w{3}\.)?[\w_-]+((\.\w{2,}){1,2})(\/([\w\._-]+\/?)*(\?[\w_-]+=[^\?\/&]*(\&[\w_-]+=[^\?\/&]*)*)?)?$/;

  useEffect(() => {
    disabledBtn(title, url)
  }, [])

  function disabledBtn(title, url) {
    if (title === "" || title.length <= 2 && url.length <= 2 || url === "" || !regexUrl.test(url)) {
      setDisabledButtonAddSubmit(true)
    } else {
      setDisabledButtonAddSubmit(false)
    }
  }

  const validateInput = (value) => {
    if (value === "" || value.length <= 2) {
      return "Campo obrigatório";
    } else {
      return "";
    }
  };

  const validateInputUrl = (value) => {
    if (value === "" || value.length <= 2 || !regexUrl.test(value)) {
      return "Digite uma URL válida";
    } else {
      return "";
    }
  };


  function handleUpdateTitle(evt) {
    const value = evt.target.value;
    setTitle(value);
    const error = validateInput(value);
    setErrorMessage(error);
    disabledBtn(value, url)

  }

  function handleUpdateUrl(evt) {
    const value = evt.target.value;
    setUrl(value);
    const error = validateInputUrl(value);
    setErrorMessageURL(error);
    disabledBtn(title, value)
  }

  function handleSubmitAdd(evt) {
    evt.preventDefault();

    handleSubmit({ title, url }, currentUser);
    setTitle("");
    setUrl("");
    setDisabledButtonAddSubmit(true)

    onClose();
  }

  return (
    <section className={`${classPopupAddPlace} popup popup-add`} id="popup-add">
      <div className="popup-add__container">
        <img
          className="popup__icon popup-add__icon"
          alt="icone fechar popup"
          src={iconClose}
          onClick={onClose}
        />
        <h2 className="popup-add__title">Novo lugar</h2>
        <form
          onSubmit={handleSubmitAdd}
          className="popup__form popup-add__form"
          id="form-add"
          name="forname"
          noValidate
        >
          <div className="popup-add__form-display">
            <input
              type="text"
              className={
                errorMessage
                  ? "popup-add__description-title popup__input popup__input_type_error"
                  : ""
              }
              placeholder="Titulo"
              value={title}
              onChange={handleUpdateTitle}
              required
            />
            {errorMessage && (
              <span id="input-place" className="popup__span-message">
                {errorMessage}
              </span>
            )}
          </div>
          <div className="popup-add__form-display">
            <input
              type="url"
              className={
                errorMessageURL
                  ? "popup-add__description-link popup__input popup__input_type_error"
                  : ""
              }
              placeholder="Link da imagem"
              value={url}
              onChange={handleUpdateUrl}
              required
            />
            {errorMessageURL && (
              <span id="input-url" className="popup__span-message">
                {errorMessageURL}
              </span>
            )}
          </div>
          <button
            type="submit"
            className={`${classButtonAddSubmit} popup__button popup-add__button`}
            id="button-form-add"
            name="buttons-forms"
            disabled={disabledButtonAddSubmit}
            onSubmit={handleSubmitAdd}
          >
            Criar
          </button>
        </form>
      </div>
    </section>
  );
}

export default NewPlace;
