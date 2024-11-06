import React from "react";
import iconClose from "../images/close-icon.png";

const InfoTooltip = ({ isOpen, onClose, isSuccess, message }) => {
  return (
    <div className={`modal ${isOpen ? "modal_open" : ""}`}>
      <div className="modal__content">
        <button type="button" className="modal__close-icon" onClick={onClose}>
          <img
            className="modal__close-icon-img"
            src={iconClose}
            alt="ìcone para fechar o pop-up"
          />
        </button>
        <img className={`modal__icon ${
            isSuccess ? "modal__icon_success" : "modal__icon_error"}
          }`}/>
        <p
          className={`modal__message ${
            isSuccess ? "modal__message_success" : "modal__message_error"
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default InfoTooltip;