import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";
import MealList from "./components/MealList";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <MealList/>
      </Route>
    </Router>
  );
}

export default App;
