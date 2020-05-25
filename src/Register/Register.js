import React from 'react';
import './Register.css';

function isValidEmail(email) {
    return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email);
}

export class Register extends React.Component {
    constructor() {
        super();

        this.state = {
            name: '',
            password: '',
            email: '',
            error: ''
        };
    }

    render() {
        const { name, password, email, error } = this.state;

        return (
            <div className="register">
                <div className="register__container">
                    <div className="register__title">Добро пожаловать</div>
                    <input id="file_input" type="file" accept="image/jpeg,image/png" className="register__elem" />
                    <input value={name} onChange={this.onNameChange.bind(this)} placeholder={'Логин'} className="register__elem"/>
                    <input value={email} onChange={this.onEmailChange.bind(this)} placeholder={'Почта'} className="register__elem"/>
                    <input value={password} type="password" onChange={this.onPasswordChange.bind(this)} placeholder={'Пароль'} className="register__elem"/>
                    <button
                        className="register__button"
                        onClick={this.onRegister.bind(this)}
                    >
                        Зарегестрироваться
                    </button>
                    <div className="register__elem-error">{error}</div>
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

        if (!name) {
            this.setState({error: "Вы не ввели логин"});
            return;
        }

        if (!password) {
            this.setState({error: "Вы не ввели пароль"});
            return;
        }

        if (!file) {
            this.setState({error: "Вы не добавили картинку"});
            return;
        }

        if (!email || !isValidEmail(email)) {
            this.setState({error: "Вы ввели невалидную почту"});
            return;
        }

        this.setState({error: "Загрузка..."}, () => {
            this.props.onRegister(name, password, email, file);
        });
    }
}
