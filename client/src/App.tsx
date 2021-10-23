import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

import Home from "./views/Home";
import Details from "./views/Home/Details";
import Reclam from "./views/Reclam";
import Auth from "./views/Auth";
import BooksManag from "./views/Books-manag";
import ContactsManag from "./views/Contacts-manag";
import { AuthProvider } from "react-auth-kit";

function App() {
  return (
    <AuthProvider
      authType={"cookie"}
      authName={"token"}
      cookieDomain={window.location.hostname}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/details" component={Details} />
          <Route path="/reclam" component={Reclam} />
          <Route path="/login" component={Auth} />
          <Route path="/books" component={BooksManag} />
          <Route path="/contacts" component={ContactsManag} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
