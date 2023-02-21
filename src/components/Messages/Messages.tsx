import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import NewMessage from "./NewMessage/NewMessage";
import s from "./Messages.module.css";
import { reduxForm } from "redux-form";
import { InitialStateType } from "../../redux/messagesReducer";

const MessageReduxForm = reduxForm<{ newMessage: string }>({
  form: "newMessage",
})(NewMessage);

type PropsType = {
  state: InitialStateType;
  sendMessage: (message: string) => void;
};

function Messages({ state, sendMessage }: PropsType) {
  function onSendMessage({ newMessage }: { newMessage: string }) {
    sendMessage(newMessage);
  }

  return (
    <div className={s.container}>
      <ul className={s.dialogs}>
        {state.users.map(({ user, id }) => (
          <Dialog name={user} id={id} key={id} />
        ))}
      </ul>
      <div className={s.messagesContainer}>
        <ul className={s.messages}>
          {state.messages.map(({ text, id, IsSentByMe }) => (
            <Message key={id} message={text} IsSentByMe={IsSentByMe} />
          ))}
        </ul>
        <MessageReduxForm onSubmit={onSendMessage} />
      </div>
    </div>
  );
}

export default Messages;
