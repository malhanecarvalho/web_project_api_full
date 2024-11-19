import { useContext } from "react";
import { NavLink, useHistory, useLocation, withRouter } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import logo from '../images/logo-vector.png';
import line from '../images/linha.jpg';

function Header({loggedIn, handleLogout}) {

  const history = useHistory();
  const location = useLocation();
  const { currentUser } = useContext(CurrentUserContext);

  const isSignInPage = location.pathname === "/login";
  const isSignUpPage = location.pathname === "/register";

  function signOut(evt) {
    evt.preventDefault();
    handleLogout();
    localStorage.removeItem("Triple10");
    history.push("/login");
  }

  const RenderMenuItems = () => {
    if (isSignInPage) {
      return (
        <NavLink className="menu__item" activeClassName="menu__item_active" to="/login">
          Entrar
        </NavLink>
      );
    } else if (isSignUpPage) {
      return (
        <NavLink className="menu__item" activeClassName="menu__item_active" to="/login">
          Faça o login
        </NavLink>
      );
    } else if (loggedIn) {
      return (
        <>
         <span className="menu__item menu__text">{currentUser.email}</span>
          <button onClick={signOut} className="menu__item menu__button">
            Sair
          </button>
        </>
      );
    }

    return null;
  };

  return (
    <>
      <header className="header">
        <img src={logo} className="logo" alt="imagem Around the U.S." />
        <img src={line} className="linha" alt="imagem linha horizontal" />
        <nav className="menu">
          <RenderMenuItems />
        </nav>
      </header>
    </>
  )
}

export default withRouter(Header);