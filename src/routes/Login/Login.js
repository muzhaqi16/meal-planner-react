import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'
import TextInput from '../../components/input/TextInput/TextInput'
import Button from '../../components/input/Button/Button'
import './Login.css'

export default class Login extends React.Component {
    state = { error: null, loading: false }
    handleLogin = (ev) => {
        ev.preventDefault()
        this.setState({
            loading: true
        })
        this.setState({ error: null })

        const { user_name, password } = ev.target

        AuthApiService.postLogin({
            user_name: user_name.value.toLowerCase(),
            password: password.value,
        })
            .then(res => {
                user_name.value = ''
                password.value = '';
                TokenService.saveAuthToken(res.authToken);
                window.location.reload('/planner');
            })
            .catch(res => {
                this.setState({ error: res.error, loading: false })
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
                    {
                        this.state.loading && <FontAwesomeIcon title="Loading" icon={faSpinner} className="fa-spin" id="login-spinner" />
                    }
                    <Button text='Log in' type='submit' />
                    <div className='options'>
                        <Link to='signup'>Sign Up</Link>
                        <Link to='reset'>Forgot Password</Link>
                    </div>
                </form>
            </div>)
    }
}