
import React, { useState, useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CurrentCardContext } from "../contexts/CurrentCardContext";
import iconEdit from "../images/edit-profile-photo-icon.png";
import ProfileEdit from "./Popups/ProfileEdit";
import ProfileImgEdit from "./Popups/ProfileImgEdit";
import PopupWithForm from "./Popups/PopupWithForm";
import Card from "./Card";
import NewPlace from "./Popups/NewPlace";
import ImagePopup from "./Popups/PopupImg";
import PopupDeleteConfirmation from "./Popups/PopupDeleteConfirmation";

function Main() {
  const [cardLink, setCardLink] = useState({ name: "", link: "" });
  const [cardDelete, setCardDelete] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPopupDeleteOpen, setIsPopupDeleteOpen] = useState(false);

  const classPopupImg = isOpen ? "popup-img-opened" : "";
  const classPopupProfile = isEditProfilePopupOpen ? "popup-opened" : "";
  const classPopupAddPlace = isAddPlacePopupOpen ? "popup-add-opened" : "";
  const classPopupEdit = isEditAvatarPopupOpen ? "popup-edit-opened" : "";
  const classPopupDeleteCard = isPopupDeleteOpen ? "popup-delete-opened" : "";

  const {
    currentUser,
    onProfileInfo,
    onProfileInfoAvatar,
    onUpdateUser,
    onUpdateAvatar,
  } = useContext(CurrentUserContext);

  const { cards, addLike, removeLike, handleDelete } =
    React.useContext(CurrentCardContext);

  function onEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function onEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function onAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }

  function onPopupDeleteClick(card) {
    setIsPopupDeleteOpen(true);
    setCardDelete(card);
  }

  function onCardClick(card) {
    setCardLink(card);
    setOpen(true);
  }

  function handleClosePopup() {
    setOpen(false);
    setIsEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPopupDeleteOpen(false);
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <img
            className="profile__image"
            alt="imagem do perfil"
            src={currentUser?.avatar}
          />
          <img
            className="profile__icon-avatar"
            src={iconEdit}
            alt="icone editar foto do perfil"
            onClick={onEditAvatarClick}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser?.name}</h1>
          <p className="profile__subheading">{currentUser?.about}</p>

          <button
            type="button"
            className="profile__button profile__button_icon_edit"
            onClick={onEditProfileClick}
          ></button>
        </div>
        <button
          type="button"
          className="profile__button-add profile__button-add_icon_add"
          onClick={onAddPlaceClick}
        ></button>
      </section>

      <ul className="cards">
        <NewPlace
          onClose={handleClosePopup}
          classPopupAddPlace={classPopupAddPlace}
        />
        {cards?.map((card, index) => (
          <Card
            key={index}
            card={card}
            onDelete={handleDelete}
            addLikes={addLike}
            removeLikes={removeLike}
            isPopupImgOpen={onCardClick}
            isPopupDeleteOpen={onPopupDeleteClick}
          />
        ))}
      </ul>

      <ProfileEdit
        onClose={handleClosePopup}
        classPopupProfile={classPopupProfile}
        onProfileEditChange={onProfileInfo}
        onUpdateUser={onUpdateUser}
      />
      <ProfileImgEdit
        onClose={handleClosePopup}
        classPopupEdit={classPopupEdit}
        onProfileAvatarChange={onProfileInfoAvatar}
        onUpdateAvatar={onUpdateAvatar}
      />

      <PopupDeleteConfirmation
        classPopupDeleteCard={classPopupDeleteCard}
        onClose={handleClosePopup}
        onDelete={handleDelete}
        cardDelete={cardDelete}
      />

      <ImagePopup
        cardLink={cardLink}
        onClose={handleClosePopup}
        popupImgOpened={classPopupImg}
      />

      <PopupWithForm />
    </main>
  );
}

export default Main;
