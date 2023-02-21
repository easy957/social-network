import { Field, InjectedFormProps } from "redux-form";
import { FormControl } from "../common/FormControl/FormControl";
import { required } from "../utils/validate";
import s from "../common/FormControl/FormControl.module.css";
import { AuthLoginProps } from "../../redux/types";

type PropsType = {
  captcha: string;
};

function LoginForm({
  handleSubmit,
  error,
  captcha,
}: InjectedFormProps<AuthLoginProps, PropsType> & PropsType) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          validate={[required]}
          name="email"
          type="email"
          component={FormControl}
          placeholder="Email"
        />
      </div>
      <div>
        <Field
          validate={[required]}
          name="password"
          component={FormControl}
          type="password"
          placeholder="Password"
        />
      </div>
      <div>
        <Field name="rememberMe" component="input" type="checkbox" />
        <span>remember me</span>
      </div>
      {error && <p className={s.formError}>{error}</p>}
      {captcha && (
        <>
          <img src={captcha} alt="Captcha" />
          <div>
            <Field
              validate={[required]}
              name="captcha"
              component={FormControl}
              placeholder="Enter sybmols"
            />
          </div>
        </>
      )}
      <button>Login</button>
    </form>
  );
}

export default LoginForm;
