import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

import Home from "./views/Home";
import Details from "./views/Home/Details";
import Reclam from "./views/Reclam";
import Auth from "./views/Auth";
import BooksManag from "./views/Books-manag";
import ContactsManag from "./views/Contacts-manag";
import { AuthProvider, useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { Provider } from "react-redux";
import store from "./state/store";

function App() {
  return (
    <AuthProvider
      authType={"cookie"}
      authName={"token"}
      cookieDomain={window.location.hostname}
    >
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/details" component={Details} />
            <Route path="/reclam" component={Reclam} />
            <Route path="/login" component={Auth} />

            <Route path="/books" component={BooksManag} />
            <Route path="/contacts" component={ContactsManag} />
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  );
}

export default App;
