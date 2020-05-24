import React from 'react';
import './Header.css';
import {Pages} from "../App";

export class Header extends React.Component {
  render() {
    const { isLogin, onPageChange, onLogout } = this.props;

    return (
        <div className="header">
          <div className="header__title" onClick={()=>{onPageChange(Pages.main)}}><b>Конвертер валют</b></div>
          <div className="header__buttons">
            {!isLogin && <div className="header__button" onClick={()=>{onPageChange(Pages.login)}}>Вход</div>}
            {!isLogin && <div className="header__button" onClick={()=>{onPageChange(Pages.register)}}>Регистрация</div>}
            {isLogin && <div className="header__button" onClick={()=>{onPageChange(Pages.convert)}}>Конвертация</div>}
            {isLogin && <div className="header__button" onClick={onLogout}>Выход</div>}
          </div>
        </div>
    );
  }
};
