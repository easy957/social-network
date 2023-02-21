import { NavLink } from "react-router-dom";
import s from "./Dialog.module.css";

type PropsType = {
  name: string;
  id: string;
};

function Dialog({ name, id }: PropsType) {
  return (
    <li>
      <NavLink className={s.dialog} to={String(id)}>
        {name}
      </NavLink>
    </li>
  );
}

export default Dialog;
