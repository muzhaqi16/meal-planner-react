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
        const { first_name, last_name, email, user_name, password } = ev.target

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
                    <TextInput label='Confirm Password' type='password' />
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