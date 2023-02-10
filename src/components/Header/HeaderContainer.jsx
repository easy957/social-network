import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import {
  logoutThunk,
  setUserData,
  setUserPhoto,
} from "../../redux/authReducer";

class HeaderContainer extends React.Component {
  render() {
    return <Header {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    id: state.auth.id,
    login: state.auth.login,
    isAuth: state.auth.isAuth,
    photo: state.auth.photo,
  };
}

export default connect(mapStateToProps, {
  setUserData,
  setUserPhoto,
  logout: logoutThunk,
})(HeaderContainer);
