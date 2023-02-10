import { NavLink } from "react-router-dom";
import s from "./Dialog.module.css";

function Dialog({ name, id }) {
  return (
    <li>
      <NavLink className={s.dialog} to={String(id)}>
        {name}
      </NavLink>
    </li>
  );
}

export default Dialog;
