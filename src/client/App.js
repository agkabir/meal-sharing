import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Outlet,
} from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";
import MealList from "./components/MealList";
import Home from "./components/Home";
import MealDetails from "./components/MealDetails";
import { MealsContextProvider } from "./components/FetchMeals";
import Reviews from "./components/Reviews";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./components/styles.css";

function App() {
  return (
    <Router>
      <NavBar />
      <MealsContextProvider>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/meals">
          <MealList />
        </Route>
        <Route exact path="/meals/:id">
          <MealDetails />
        </Route>
        <Route exact path="/reviews">
          <Reviews />
        </Route>
      </MealsContextProvider>
      <Footer />
    </Router>
  );
}

export default App;
