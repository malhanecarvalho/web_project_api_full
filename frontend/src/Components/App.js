import {
  Switch,
  Route,
  withRouter,
  useHistory,
} from "react-router-dom";

import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    handleCheckToken();
  }, []);

  async function handleCheckToken() {
    const isToken = localStorage.getItem("Triple10");
    const userId = localStorage.getItem("userId");

    if (isToken) {
      try {
        const response = await auth.checkToken(isToken, userId);
        if (response.ok) {
          handleLogin();
          history.push("/");
        }
      } catch (error) {
        console.error("Erro ao verificar token:", error);
        handleLogout()
      }
    } else {
      handleLogout()
    }
  };

  function handleLogin() {
    setLoggedIn(true);
  };

  function handleLogout() {
    setLoggedIn(false);
  };

  return (
    <div className="page">
      <Header handleLogout={handleLogout} loggedIn={loggedIn} />
      <Switch>
        <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main} />
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login handleLogin={handleLogin} loggedIn={loggedIn} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default withRouter(App);
