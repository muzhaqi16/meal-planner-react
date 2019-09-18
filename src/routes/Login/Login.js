import React from 'react';
import { Link } from "react-router-dom";
import AuthApiService from '../../services/auth-api-service'
import TextInput from '../../components/input/TextInput/TextInput'
import Button from '../../components/input/Button/Button'
import './Login.css'

export default class Login extends React.Component {
    state = { error: null }
    handleLogin = (ev) => {
        ev.preventDefault()

        const { history } = this.props
        this.setState({ error: null })

        const { user_name, password } = ev.target

        AuthApiService.postLogin({
            user_name: user_name.value.toLowerCase(),
            password: password.value,
        })
            .then(res => {
                user_name.value = ''
                password.value = '';
                console.log(res)
                history.push('planner')
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }
    render() {
        const { error } = this.state
        return (
            <div className="login-page">
                <form onSubmit={this.handleLogin} id='login-form'>
                    <h2>Log in</h2>
                    <TextInput label='Username' id='user_name' />
                    <TextInput label='Password' type='password' id="password" />
                    <div role='alert'>
                        {error && <p className='red'>{error}</p>}
                    </div>
                    <Button text='Log in' type='submit' />
                    <div className='options'>
                        <Link to='signup'>Sign Up</Link>
                        <Link to='reset'>Forgot Password</Link>
                    </div>
                </form>
            </div>)
    }
}