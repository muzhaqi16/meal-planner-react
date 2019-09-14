import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'
import LandingPage from './components/LandingPage/LandingPage';
import Planner from './components/Planner/Planner';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route path="/" exact component={LandingPage} />
          <Route path="/planner" component={Planner} />
          <Route path="/signin/" component={Login} />
          <Route path="/signup/" component={Signup} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
