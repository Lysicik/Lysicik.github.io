import React from 'react';
import './App.css';
import {Header} from "./Header/Header";
import {Login} from "./Login/Login";
import {Register} from "./Register/Register";
import {Main} from "./Main/Main";
import {Convert} from "./Convert/Convert";
import {onLogin, onRegister} from "./firebase";

export const Pages = {
  main: '/main',
  login: '/login',
  register: '/register',
  convert: '/convert'
};

const callbackHistory = () => {
  window.history.pushState({}, "", document.location.origin + Pages.main)
};

export class App extends React.Component {
  constructor() {
    super();

    this.state = {
      page: Pages.main,
      isLogin: localStorage.getItem('isLogin') === 'true'
    };
  }

  componentDidMount() {
    const {isLogin} = this.state;

    switch (document.location.pathname) {
      case Pages.convert: {
        if (isLogin) {
          this.setState({page: Pages.convert})
        } else {
          this.setState({page: Pages.main}, callbackHistory)
        }

        break;
      }
      case Pages.login: {
        if (!isLogin) {
          this.setState({page: Pages.login})
        } else {
          this.setState({page: Pages.main}, callbackHistory)
        }

        break;
      }
      case Pages.register: {
        if (!isLogin) {
          this.setState({page: Pages.register})
        } else {
          this.setState({page: Pages.main}, callbackHistory)
        }

        break;
      }
      default: {
        this.setState({page: Pages.main}, callbackHistory)
      }
    }
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
    this.setState({page: newPage}, () => {
      window.history.pushState({}, "", document.location.origin + newPage)
    })
  }

  onLogin(login, password) {
    onLogin(login, password, () => {this.setState({isLogin: true, page: Pages.main}, () => {localStorage.setItem('isLogin', true); callbackHistory();})}, () => {alert("При логине произошла ошибка")});
  }

  onRegister(login, password, email, file) {
    onRegister(login, password, email, file, () => {this.setState({isLogin: true, page: Pages.main}, () => {localStorage.setItem('isLogin', true); callbackHistory();})}, () => {alert("При регистрации произошла ошибка")});
  }

  onLogout() {
    this.setState({isLogin: false, page: Pages.main}, () => {localStorage.setItem('isLogin', false); callbackHistory();})
  }
};
