import React from 'react';
import { Link } from "react-router-dom";
import TextInput from '../input/TextInput/TextInput'
import Button from '../input/Button/Button'
import './Login.css'

export default class Login extends React.Component {
    handleLogin = (ev) => {
        ev.preventDefault(0)
    }
    render() {
        return (
            <>
                <form onSubmit={this.handleLogin} id='login-form'>
                    <h2>Log in</h2>
                    <TextInput label='Email' />
                    <TextInput label='Password' type='password' />
                    <Button text='Log in' type='submit' />
                    <div className='options'>
                        <Link to='signup'>Sign Up</Link>
                        <Link to='reset'>Forgot Password</Link>
                    </div>
                </form>
            </>)
    }
}