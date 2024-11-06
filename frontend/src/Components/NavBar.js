import React from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";

function NavBar({ handleLogout, loggedIn }) {
  const history = useHistory();
  const url = useLocation();
  const location = useLocation();

  const isSignInPage = location.pathname === "/login";
  const isSignUpPage = location.pathname === "/register";

  function signOut(evt) {
    evt.preventDefault();
    handleLogout();
    localStorage.removeItem("Triple10");
    history.push("/login");
  }

  console.log(url)
  let component 
  console.log(component)
  if (url === "/login") {
    component =  <NavLink
    className="menu__item"
    activeClassName="menu__item_active"
    exact to="/login"
  >
    Faça o login
  </NavLink>
  }

  if (url === "/register") {
    component =   <NavLink
    exact
    className="menu__item"
    activeClassName="menu__item_active"
    to="/register"
  >
    Registrar
  </NavLink>
  }

  if (url === "/") {
    component =  <button
    type="submit"
    className="menu__item menu__button"
    onClick={signOut}
  >
    Sair
  </button>
  }

  const RenderMenuItems = () => {
    if (isSignInPage) {
      return (
        <NavLink className="menu__item" activeClassName="menu__item_active" to="/signin">
          Entrar
        </NavLink>
      );
    } else if (isSignUpPage) {
      return (
        <NavLink className="menu__item" activeClassName="menu__item_active" to="/signup">
          Faça o login
        </NavLink>
      );
    } else if (loggedIn) {
      return (
        <>
          <button onClick={signOut} className="menu__item menu__button">
            Sair
          </button>
        </>
      );
    }
    
    return null; 
  };

  return (
    <nav className="menu">
  <RenderMenuItems/>
    </nav>
  );
}

//export default NavBar;
