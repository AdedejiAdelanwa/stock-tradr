import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import StockDetails from './components/StockDetails';
import Stocks from './components/Stocks';

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/stocks">
        <Stocks />
      </Route>
      <Route exact path="/stocks/:ticker">
        <StockDetails />
      </Route>
    </Router>
  );
}

export default App;
