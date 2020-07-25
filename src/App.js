import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import NavBar from "./components/common/NavBar";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import NotFound from "./components/notFound";
import MovieForm from "./components/common/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
