import iconClose from "../../images/close-icon.png";

function ImagePopup({ onClose, cardLink, popupImgOpened }) {
  return (
    <section className={`${popupImgOpened} popup-img`} onClick={onClose}>
      <img
        className="popup-img__icon"
        alt="icone fechar popup"
        src={iconClose}
        onClick={onClose}
      />
      <ul className="popup-img__container">
        <li>
          <img
            src={cardLink.link}
            alt={cardLink.name}
            className="popup-img__photo"
          />
        </li>
        <li>
          <h3 className="popup-img__title">{cardLink.name}</h3>
        </li>
      </ul>
    </section>
  );
}

export default ImagePopup;
