import React from 'react';
import { Link } from "react-router-dom";
import './Header.css'

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <div id="logo">
                    <h2><a href="index.html">Meal Planner</a></h2>
                </div>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/signin">Log in</Link>
                    <Link to="/planner">Plan It</Link>
                </nav>
            </header>)
    }
}