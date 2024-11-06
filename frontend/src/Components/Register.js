import React, { useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoToolTip";

function Signup() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSucces] = useState(false);

  const validateEmail = (value) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (value === "" || value.length <= 2 || !emailRegex.test(value)) {
      return "Digite um e-mail válido";
    } else {
      return "";
    }
  };

  const validatePassword = (value) => {
    if (value === "" || value.length <= 2) {
      return "Digite uma senha válida";
    } else {
      return "";
    }
  };

  function handleUpdateEmail(evt) {
    const value = evt.target.value;
    setEmail(value);
    const error = validateEmail(value);
    setErrorMessage(error);
  }

  function handleUpdatePassword(evt) {
    const value = evt.target.value;
    setPassword(value);
    const error = validatePassword(value);
    setErrorMessagePassword(error);
  }

  function modalSuccess() {
    setIsOpen(true);
    setMessage("Vitória! Você precisa se registrar.");
    setIsSucces(true);
  }

  function modalFail() {
    setIsOpen(true);
    setMessage("Ops, algo saiu deu errado! Por favor, tente novamente.");
    setIsSucces(false);
  }

  function modalClose() {
    setIsOpen(false);
    setMessage("");
    setIsSucces(false);
  }


  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      if (password && email) {
        const response = await auth.register({ email, password });
        if (!response.ok) {
          throw new Error();
        }
        modalSuccess();
        setEmail("");
        setPassword("");
        setTimeout(() => { history.push("/login") }, 1000)
      }
    } catch (error) {
      console.log("error register", error);
      modalFail();
      setEmail("");
      setPassword("");
    }
  }

  return (

    <section className="signup">
      <h2 className="signup__title">Inscrever-se</h2>
      <form className="signup__form" onSubmit={handleSubmit}>
        <div className="signup__form-display">
          <input
            type="email"
            className={errorMessage ? "signup__email" : " "}
            placeholder="E-mail"
            value={email}
            onChange={handleUpdateEmail}
            style={{
              width: 358,
              backgroundColor: "black",
              color: "white"
            }}
          />
          {errorMessage && (
            <span className="signup__span-message">{errorMessage}</span>
          )}
        </div>
        <div className="signup__form-display">
          <input
            type="password"
            className={errorMessagePassword ? "signup__password" : " "}
            placeholder="Senha"
            value={password}
            onChange={handleUpdatePassword}
            style={{
              width: 358,
              backgroundColor: "black",
              color: "white"
            }}
          />
          {errorMessagePassword && (
            <span className="signup__span-message">
              {errorMessagePassword}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="signup__button"
          onSubmit={handleSubmit}
        >
          Inscrever-se
        </button>
        <div className="signup__link">
          <Link
            to="/login"
            style={{ color: "white", textDecoration: "none" }}
          >
            Já é um membro? Faça o login aqui!
          </Link>
        </div>
      </form>
      <InfoTooltip
        isOpen={isOpen}
        onClose={modalClose}
        isSuccess={isSuccess}
        message={message}
      />
    </section>

  );
}

export default withRouter(Signup);
