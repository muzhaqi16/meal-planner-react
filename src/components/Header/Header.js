import React from 'react';
import { Link } from "react-router-dom";
import TokenService from '../../services/token-service'
import './Header.css'

export default class Header extends React.Component {
    state = {
        hidden: true
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
                <nav role="navigation">
                    <Link to="/">Home</Link>

                    {TokenService.hasAuthToken()
                        ? this.renderLogoutLink()
                        : this.renderLoginLink()}

                    <Link to="/planner">Plan&nbsp;It</Link>

                </nav>
            </header>)
    }
}