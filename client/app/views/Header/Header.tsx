import * as React from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../../../assets/images/home_icon_orange.png';
import '../../../assets/styles';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div>DOCTOR PLUS</div>
      <Link className="header-homeicon" to="/">
        <img src={homeIcon} alt="home icon image" />
      </Link>
      <nav className="navigation">
        <Link to="/" className="nav-underline">
          SIGN UP
        </Link>
        <Link to="/" className="nav-underline">
          SIGN IN
        </Link>
      </nav>
    </header>
  );
};
