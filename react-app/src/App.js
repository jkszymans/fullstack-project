import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginUser from "./components/accounts/LoginUser";
import RegisterUser from "./components/accounts/RegisterUser";
import HomePage from "./components/home/HomePage";
// import WorkoutMenu from "./components/workoutmenu/WorkoutMenu";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route path="/" exact component={HomePage}></Route>
            <Route path="/login" exact component={LoginUser}></Route>
            <Route path="/register" exact component={RegisterUser}></Route>
            {/* <Route path="/workout-menu" exact component={WorkoutMenu}></Route> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
