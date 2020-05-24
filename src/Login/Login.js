import React from 'react';
import './Login.css';

export class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            name: '',
            password: ''
        };
    }

    render() {
        const { name, password } = this.state;

        return (
            <div className="login">
                <div className="login__container">
                    <div className="login__title">Добро пожаловать</div>
                    <input value={name} onChange={this.onNameChange.bind(this)} placeholder={'Логин'} className="login__elem"/>
                    <input value={password} onChange={this.onPasswordChange.bind(this)} placeholder={'Пароль'} className="login__elem"/>
                    <button
                        className="login__button"
                        onClick={this.onLogin.bind(this)}
                    >
                        Войти
                    </button>
                </div>
            </div>
        );
    }

    onNameChange(e) {
        this.setState({name: e.target.value});
    }

    onPasswordChange(e) {
        this.setState({password: e.target.value});
    }

    onLogin() {
        const { name, password } = this.state;

        this.props.onLogin(name, password);
    }
}
