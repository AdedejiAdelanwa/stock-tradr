import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Stocks from './components/Stocks';

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/stocks">
        <Stocks />
      </Route>
    </Router>
  );
}

export default App;
