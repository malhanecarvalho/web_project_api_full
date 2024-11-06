import iconClose from "../../images/close-icon.png";
import React, { useState, useEffect } from "react";

function ProfileEdit({
  onClose,
  classPopupProfile,
  onProfileEditChange,
  onUpdateUser
}) {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [errorMessage, setErrorMessage] = useState({ name: "", about: "" });
  const [disabledButtonSubmit, setDisabledButtonSubmit] = useState(true);
  const classButtonSubmit = disabledButtonSubmit ? "popup__button_disabled" : "";

 useEffect(() => {
    disabledBtn(title, about)
  }, [])

  function disabledBtn(title, about) {
    if ( title === "" || title.length <=2 && about.length <=2 || about === "") {
    setDisabledButtonSubmit(true)
    }else{
     setDisabledButtonSubmit(false)
    } 
   }

  const validateinputs = (value) => {
    if (value === "" || value.length <= 2) {
      return "Campo obrigatório";
    } else {
      return "";
    }
  };

  function handleUpdateTitle(evt) {
    const value = evt.target.value;
    setTitle(value);
    const error = validateinputs(value);
    setErrorMessage({ ...errorMessage, name: error });
    disabledBtn(value, about)
  }

  function handleUpdateAbout(evt) {
    const value = evt.target.value;
    setAbout(value);
    const error = validateinputs(value);
    setErrorMessage({ ...errorMessage, about: error });
    disabledBtn(title, value)
  }

  function handleSubmitProfile(evt) {
    evt.preventDefault();
    onUpdateUser({title: title, about:about})
    setTitle("");
    setAbout("");
    setDisabledButtonSubmit(true)

    onClose();
  }

  return (
    <section className={`${classPopupProfile} popup`} id="popup">
      <div className="popup__container">
        <img
          className="popup__icon"
          alt="icone fechar popup"
          src={iconClose}
          onClick={onClose}
        />
        <h2 className="popup__title">Editar perfil</h2>
        <form
          className="popup__form"
          id="form"
          name="formname"
          onSubmit={handleSubmitProfile}
          noValidate
        >
          <div className="popup__form-display">
            <input
              type="text"
              className={
                errorMessage.name
                  ? "popup__description-name popup__input popup__input_type_error"
                  : ""
              }
              name="name"
              placeholder="Name"
              value={title}
              onChange={handleUpdateTitle}
              required
            />
            {errorMessage.name && (
              <span id="input-title" className="popup__span-message">
                {errorMessage.name}
              </span>
            )}
          </div>
          <div className="popup__form-display">
            <input
              type="text"
              className={
                errorMessage.about
                  ? "popup__description-job  popup__input popup__input_type_error"
                  : ""
              }
              name="about"
              placeholder="Sobre mim"
              value={about}
              onChange={handleUpdateAbout}
              required
            />
            {errorMessage.about && (
              <span id="input-job" className="popup__span-message">
                {errorMessage.about}
              </span>
            )}
          </div>
          <button
            type="submit"
            className={`${classButtonSubmit} popup__button`}
            id="button-form"
            name="buttons-forms"
            onClick={() => onProfileEditChange({ title, about })}
            disabled={disabledButtonSubmit}
            onSubmit={handleSubmitProfile}
          >
            Salvar
          </button>
        </form>
      </div>
    </section>
  );
}

export default ProfileEdit;
