import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import NewMessage from "./NewMessage/NewMessage";
import s from "./Messages.module.css";
import { reduxForm } from "redux-form";

const MessageReduxForm = reduxForm({
  form: "newMessage",
})(NewMessage);

function Messages({ state, sendMessage }) {
  function onSendMessage({ newMessage }) {
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
          {state.messages.map(({ text, id, sentByMe }) => (
            <Message key={id} message={text} sentByMe={sentByMe} />
          ))}
        </ul>
        <MessageReduxForm onSubmit={onSendMessage} />
      </div>
    </div>
  );
}

export default Messages;
