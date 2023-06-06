import { useContext } from 'react';
import { useLocation,  Link } from 'react-router-dom';
import headerLogo from '../images/header-logo.svg';
import { AppContext } from '../contexts/AppContext.js';

function Header({ handleLogout, email }) {
  const context = useContext(AppContext);
  const location = useLocation()

  return (
    <header className="header page__header">
      <img src={headerLogo} alt="Логотип сайта" className="header__logo" />
      <ul className="header__nav">
        {context.isLoggedIn && <li><Link to="/" className={`header__email`}>{email}</Link></li>}
        {location.pathname === '/sign-in' && <li><Link to="/sign-up" className={`header__link`}>Регистрация</Link></li>}
        {location.pathname === '/sign-up' && <li><Link to="/sign-in" className={`header__link`}>Войти</Link></li>}
        {context.isLoggedIn && <li><button onClick={handleLogout} className={`header__button button-transparent`}>Выйти</button></li>}
      </ul>
    </header>
  );
}

export default Header;
