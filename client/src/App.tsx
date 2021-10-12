import React from 'react';
import { BrowserRouter, Switch,Route } from 'react-router-dom';
import './App.css';

import Home from './views/Home';
import Reclam from './views/Reclam';


function App() {
  return (
  <BrowserRouter>
   <Switch>
      <Route path="/home" component={Home} />
      <Route path="/reclam" component={Reclam} />
   </Switch>
  </BrowserRouter>
  );
}

export default App;
