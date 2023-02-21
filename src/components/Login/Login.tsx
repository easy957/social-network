import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { reduxForm } from "redux-form";
import { loginThunk } from "../../redux/authReducer";
import LoginForm from "./LoginForm";
import { AppStateType } from "../../redux/redux-store";
import { AuthLoginProps } from "../../redux/types";

const LoginReduxForm = reduxForm<AuthLoginProps, { captcha: string }>({
  form: "login",
})(LoginForm);

type MapStatePropsType = {
  isAuth: boolean;
  captcha: string;
};

type MapDispatchPropsType = {
  login: (loginData: AuthLoginProps) => void;
};

function Login({
  login,
  isAuth,
  captcha,
}: MapStatePropsType & MapDispatchPropsType) {
  function onSubmit(formData: AuthLoginProps) {
    login(formData);
  }

  if (isAuth) {
    return <Navigate to="/profile" />;
  }
  return (
    <>
      <h1>Login</h1>
      <LoginReduxForm captcha={captcha} onSubmit={onSubmit} />
    </>
  );
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  captcha: state.auth.captcha,
});

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  {},
  AppStateType
>(mapStateToProps, { login: loginThunk })(Login);
