import React from 'react';
import './App.css';
import {Header} from "./Header/Header";
import {Login} from "./Login/Login";
import {Register} from "./Register/Register";
import {Main} from "./Main/Main";
import {Convert} from "./Convert/Convert";
import {onLogin, onRegister} from "./firebase";

export const Pages = {
  main: 'main',
  login: 'login',
  register: 'register',
  convert: 'convert'
};

function isValidEmail(email) {
  return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email);
}

export class App extends React.Component {
  constructor() {
    super();

    this.state = {
      page: Pages.register,
      isLogin: false
    };
  }

  render() {
    const {isLogin, page} = this.state;

    return (
        <div className="app">
          <Header onPageChange={this.onPageChange.bind(this)} isLogin={isLogin} onLogout={this.onLogout.bind(this)}/>
          {page === Pages.login && <Login onLogin={this.onLogin.bind(this)} />}
          {page === Pages.register && <Register onRegister={this.onRegister.bind(this)} />}
          {page === Pages.main && <Main />}
          {page === Pages.convert && <Convert />}
        </div>
    );
  }

  onPageChange(newPage) {
    this.setState({page: newPage})
  }

  onLogin(login, password) {
    if (login && password) {
      onLogin(login, password, () => {this.setState({isLogin: true, page: Pages.main})}, () => {alert("При логине произошла ошибка")});
    }
  }

  onRegister(login, password, email, file) {
    console.log('isValidEmail: ', isValidEmail(email));
    if (login && password && isValidEmail(email) && file) {
      onRegister(login, password, email, file, () => {this.setState({isLogin: true, page: Pages.main})}, () => {alert("При регистрации произошла ошибка")});
    }
  }

  onLogout() {
    this.setState({isLogin: false, page: Pages.main})
  }
};
