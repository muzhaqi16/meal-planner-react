import React from 'react';
import { Link } from "react-router-dom";
import TokenService from '../../services/token-service'
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
                TokenService.saveAuthToken(res.authToken)
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
                    <TextInput label='Username' id='user_name' placeholder="Default: test" />
                    <TextInput label='Password' type='password' id="password" placeholder="Default: Test123!" />
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