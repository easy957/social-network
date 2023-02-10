import s from "./Header.module.css";
import photoPlaceholder from "../../assets/images/profilePicture.webp";
import { NavLink } from "react-router-dom";

function Header({ isAuth, login, logout, photo }) {
  function setUser() {
    return (
      <div>
        <p>{login}</p>
      </div>
    );
  }

  return (
    <header className={s.header}>
      <img
        className={s.logo}
        src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-logo-design-template-78655edda18bc1196ab28760f1535baa_screen.jpg?ts=1617645324"
        alt="logo"
      />

      <div className={s.user}>
        {isAuth && <button onClick={logout}>Log out</button>}
        {isAuth ? setUser() : <NavLink to="login">Login</NavLink>}
        <img
          className={s.photo}
          src={photo ? photo : photoPlaceholder}
          alt="Avatar"
        />
      </div>
    </header>
  );
}

export default Header;
