import s from "./Message.module.css";

function Message({ message, sentByMe }) {
  return (
    <li className={sentByMe ? s.myItem : s.friendItem}>
      <p className={`${s.message} ${sentByMe ? s.myMessage : s.friendMessage}`}>
        {message}
      </p>
      <p className={`${s.name} ${sentByMe ? s.textAlignEnd : ""}`}>
        {sentByMe ? "me" : "name"}
      </p>
    </li>
  );
}

export default Message;
