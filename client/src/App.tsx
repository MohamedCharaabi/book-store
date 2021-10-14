import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

import Home from "./views/Home";
import Reclam from "./views/Reclam";
import Auth from "./views/Auth";
import BooksManag from "./views/Books-manag";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/reclam" component={Reclam} />
        <Route path="/login" component={Auth} />
        <Route path="/books" component={BooksManag} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
