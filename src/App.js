import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'
import LandingPage from './routes/LandingPage/LandingPage';
import Planner from './routes/Planner/Planner';
import Login from './routes/Login/Login';
import Signup from './routes/Signup/Signup';

import PrivateRoute from './components/Utils/PrivateRoute'
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute'

import './App.css'
class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route path="/" exact component={LandingPage} />
          <PrivateRoute path="/planner" exact component={Planner} />
          <PrivateRoute path="/planner/:week" component={Planner} />
          <PublicOnlyRoute path="/signin" component={Login} />
          <PublicOnlyRoute path="/signup" component={Signup} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
