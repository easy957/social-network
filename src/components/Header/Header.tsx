import s from "./Header.module.css";
import photoPlaceholder from "../../assets/images/profilePicture.webp";
import { NavLink } from "react-router-dom";

type PropsType = {
  login: string | null;
  isAuth: boolean | null;
  photo: string | null;
  logout: () => void;
};

function Header({ isAuth, login, logout, photo }: PropsType) {
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
        {isAuth ? (
          setUser()
        ) : (
          <NavLink className={s.logout} to="login">
            Login
          </NavLink>
        )}
        {isAuth && (
          <>
            <img
              className={s.photo}
              src={photo ? photo : photoPlaceholder}
              alt="Avatar"
            />
            <button className={s.logout} onClick={logout}>
              Log out
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
