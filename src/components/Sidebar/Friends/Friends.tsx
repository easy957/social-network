import { FriendType } from "../../../redux/types";
import s from "./Friends.module.css";

type PropsType = {
  friendsState: Array<FriendType>;
};

function Friends({ friendsState }: PropsType) {
  return (
    <div className={s.wrapper}>
      <p className={s.title}>Friends</p>
      <ul className={s.list}>
        {friendsState.map((friend) => {
          return (
            <li key={friend.id} className={s.item}>
              <img
                className={s.image}
                src={friend.profilePicture}
                alt="Profile"
              />
              <p className={s.name}> {friend.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Friends;
