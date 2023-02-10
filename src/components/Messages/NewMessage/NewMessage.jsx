import { Field } from "redux-form";
import { FormControl } from "../../common/FormControl/FormControl";
import { maxLength, required } from "../../utils/validate";
import s from "./NewMessage.module.css";

const maxLength300 = maxLength(300);

function NewMessage({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className={s.wrapper}>
      <Field
        name="newMessage"
        type="textarea"
        component={FormControl}
        className={s.input}
        validate={[required, maxLength300]}
      />
      <button className={s.button}>Send message</button>
    </form>
  );
}

export default NewMessage;
