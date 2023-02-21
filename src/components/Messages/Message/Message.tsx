import s from "./Message.module.css";

type PropsType = {
  message: string;
  IsSentByMe: boolean;
};

function Message({ message, IsSentByMe }: PropsType) {
  return (
    <li className={IsSentByMe ? s.myItem : s.friendItem}>
      <p
        className={`${s.message} ${IsSentByMe ? s.myMessage : s.friendMessage}`}
      >
        {message}
      </p>
      <p className={`${s.name} ${IsSentByMe ? s.textAlignEnd : ""}`}>
        {IsSentByMe ? "me" : "name"}
      </p>
    </li>
  );
}

export default Message;
