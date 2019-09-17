import React from 'react';
import { Link } from "react-router-dom";
import TextInput from '../input/TextInput/TextInput'
import Button from '../input/Button/Button'
import './Signup.css'

export default class Signup extends React.Component {
    handleSignup = (ev) => {
        ev.preventDefault();
    }
    render() {
        return (
            <>
                <form onSubmit={this.handleSignup} id='signup-form'>
                    <h2>Sign Up</h2>
                    <TextInput label='Name' />
                    <TextInput label='Email' />
                    <TextInput label='Password' type='password' />
                    <TextInput label='Confirm Password' type='password' />
                    <Button text='Sign up' type='submit' />
                    <div className='options'>
                        <Link to='login'>Log in</Link>
                        <Link to='reset'>Forgot Password</Link>
                    </div>
                </form>
            </>)
    }
}