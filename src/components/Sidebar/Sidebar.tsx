import { NavLink } from "react-router-dom";
import Friends from "./Friends/Friends";
import s from "./Sidebar.module.css";
import { InitialStateType } from "../../redux/sidebarReducer";

type PropsType = {
  state: InitialStateType;
};

function Sidebar({ state }: PropsType) {
  function activeClassSetter({ isActive }: { isActive: boolean }) {
    return isActive ? `${s.link} ${s.active}` : s.link;
  }

  return (
    <aside className={s.aside}>
      <nav>
        <ul className={s.list}>
          <li>
            <NavLink
              className={(data) => activeClassSetter(data)}
              to="/profile"
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink className={(data) => activeClassSetter(data)} to="/users">
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(data) => activeClassSetter(data)}
              to="/messages"
            >
              Messages
            </NavLink>
          </li>
          <li>
            <NavLink className={(data) => activeClassSetter(data)} to="/news">
              News
            </NavLink>
          </li>
          <li>
            <NavLink className={(data) => activeClassSetter(data)} to="/music">
              Music
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(data) => activeClassSetter(data)}
              to="settings"
            >
              Settings
            </NavLink>
          </li>
        </ul>
        <Friends friendsState={state.friends} />
      </nav>
    </aside>
  );
}

export default Sidebar;
