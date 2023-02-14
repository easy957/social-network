import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { reduxForm } from "redux-form";
import { loginThunk } from "../../redux/authReducer.ts";
import LoginForm from "./LoginForm";

const LoginReduxForm = reduxForm({
  form: "login",
})(LoginForm);

function Login({ login, isAuth, captcha }) {
  function onSubmit(formData) {
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

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captcha: state.auth.captcha,
});

export default connect(mapStateToProps, { login: loginThunk })(Login);
