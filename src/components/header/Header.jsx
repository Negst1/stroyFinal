import React from "react";
import { Link } from "react-router-dom"; // Импортируем Link для навигации
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        {/* Добавляем ссылку на страницу portfolio */}
        <div className="header-nav">
          <Link to="/portfolio" className="header-nav__link">
            Мои проекты
          </Link>
        </div>
        <div className="header-language">
          <div className="header-language__text">ru</div>
        </div>


        <div className="profile-photo__background">
          {/* Ваш контент для аватара */}
        </div>
      </div>
    </header>
  );
};

export default Header;
