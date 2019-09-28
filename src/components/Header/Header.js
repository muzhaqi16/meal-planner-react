import React from 'react';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

import TokenService from '../../services/token-service'
import './Header.css'

export default class Header extends React.Component {
    state = {
        hidden: false,
        mobile: false
    };
    handleLogoutClick = () => {
        this.setState({ hidden: !this.state.hidden })
        TokenService.clearAuthToken();
    }
    handleClick = () => {
        this.setState({ hidden: !this.state.hidden })
    }
    renderLogoutLink() {
        return (
            <a onClick={this.handleLogoutClick} href='/'> Log&nbsp;out</a>
        )
    }

    renderLoginLink() {
        return (
            <Link to='/signin' onClick={() => this.setState({ hidden: !this.state.hidden })}>Log&nbsp;in</Link>
        )
    }
    render() {
        return (
            <header>
                <div id="logo">
                    <h2><a href="/">Meal Planner</a></h2>
                </div>
                {/* Decide when to show the open or the close button for the menu when in mobile view */}
                <FontAwesomeIcon
                    title={this.state.mobile ? "Close" : "Open"}
                    className="hamburger-icon"
                    icon={this.state.mobile ? faTimes : faBars}
                    onClick={() => this.setState({ mobile: !this.state.mobile })} />

                <nav role="navigation" className={this.state.mobile ? "" : "hidden"}>
                    <Link to="/">Home</Link>

                    <Link to="/planner">Plan&nbsp;It</Link>
                    {/* Show login or logout based on the token saved in session */}
                    {TokenService.hasAuthToken()
                        ? this.renderLogoutLink()
                        : this.renderLoginLink()}
                </nav>
            </header>)
    }
}