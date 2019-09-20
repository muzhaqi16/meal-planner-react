import React from 'react';
import { Link } from "react-router-dom";

import AuthApiService from '../../services/auth-api-service'
import TextInput from '../../components/input/TextInput/TextInput'
import Button from '../../components/input/Button/Button'
import './Signup.css'

export default class Signup extends React.Component {
    state = { error: null }
    handleSignup = (ev) => {
        ev.preventDefault();
        const { history } = this.props
        const { first_name, last_name, email, user_name, password, cpassword } = ev.target
        if (user_name.value === "") {
            return this.setState({ error: "Username can not be empty" })
        }
        if (password.value === "" || password.value.length < 6) {
            return this.setState({ error: "Password needs to be at least 6 characters long" })
        }
        if (password.value !== cpassword.value) {
            return this.setState({ error: "Password doesn't match" })
        }
        this.setState({ error: null })
        AuthApiService.postUser({
            user_name: user_name.value,
            password: password.value,
            first_name: first_name.value,
            last_name: last_name.value,
            email: email.value
        })
            .then(user => {
                first_name.value = ''
                last_name.value = ''
                user_name.value = ''
                password.value = ''
                email.value = ''
                history.push('signin')
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }
    render() {
        const { error } = this.state
        return (
            <>
                <form onSubmit={this.handleSignup} id='signup-form'>
                    <h2>Sign Up</h2>

                    <TextInput label='First Name' id='first_name' />
                    <TextInput label='Last Name' id='last_name' />
                    <TextInput label='Username' id='user_name' />
                    <TextInput label='Email' id='email' />
                    <TextInput label='Password' type='password' id='password' />
                    <span>*Password must be at least six characters, contain an uppercase, lowercase and special character</span>
                    <TextInput label='Confirm Password' type='password' id='cpassword' />
                    <div role='alert'>
                        {error && <p className='red'>{error}</p>}
                    </div>
                    <Button text='Sign up' type='submit' />
                    <div className='options'>
                        <Link to='signin'>Log in</Link>
                        <Link to='reset'>Forgot Password</Link>
                    </div>
                </form>
            </>)
    }
}