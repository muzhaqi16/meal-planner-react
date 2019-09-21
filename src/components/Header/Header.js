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
        return (<div>
            <a onClick={this.handleLogoutClick} href='/'> Log out</a>
        </div>)
    }

    renderLoginLink() {
        return (
            <div>
                <Link to='/signin' onClick={() => this.setState({ hidden: !this.state.hidden })}>Log in</Link>
            </div>
        )
    }
    render() {
        return (
            <header>
                <div id="logo">
                    <h2><a href="/">Meal Planner</a></h2>
                </div>
                <nav>
                    <Link to="/">Home</Link>
                    <li>
                        {TokenService.hasAuthToken()
                            ? this.renderLogoutLink()
                            : this.renderLoginLink()}
                    </li>
                    <Link to="/planner">Plan&nbsp;It</Link>
                </nav>
            </header>)
    }
}