import React from 'react';
import './Register.css';

export class Register extends React.Component {
    constructor() {
        super();

        this.state = {
            name: '',
            password: '',
            email: ''
        };
    }

    render() {
        const { name, password, email } = this.state;

        return (
            <div className="register">
                <div className="register__container">
                    <div className="register__title">Добро пожаловать</div>
                    <input id="file_input" type="file" accept="image/jpeg,image/png" className="register__elem" />
                    <input value={name} onChange={this.onNameChange.bind(this)} placeholder={'Логин'} className="register__elem"/>
                    <input value={email} onChange={this.onEmailChange.bind(this)} placeholder={'Почта'} className="register__elem"/>
                    <input value={password} onChange={this.onPasswordChange.bind(this)} placeholder={'Пароль'} className="register__elem"/>
                    <button
                        className="register__button"
                        onClick={this.onRegister.bind(this)}
                    >
                        Зарегестрироваться
                    </button>
                </div>
            </div>
        );
    }

    onNameChange(e) {
        this.setState({name: e.target.value});
    }

    onEmailChange(e) {
        this.setState({email: e.target.value});
    }

    onPasswordChange(e) {
        this.setState({password: e.target.value});
    }

    onRegister() {
        const { name, password, email } = this.state;

        const file = document.getElementById('file_input').files[0];

        this.props.onRegister(name, password, email, file);
    }
}
