import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import {
  logoutThunk,
  // setUserData,
  // setUserPhoto,
} from "../../redux/authReducer";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
  login: string | null;
  isAuth: boolean | null;
  photo: string | null;
};
type MapDispatchPropsType = {
  logout: () => void;
};

class HeaderContainer extends React.Component<
  MapStatePropsType & MapDispatchPropsType
> {
  render() {
    return <Header {...this.props} />;
  }
}

function mapStateToProps(state: AppStateType): MapStatePropsType {
  return {
    // id: state.auth.id,
    login: state.auth.login,
    isAuth: state.auth.isAuth,
    photo: state.auth.photo,
  };
}

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  {},
  AppStateType
>(mapStateToProps, {
  // setUserData,
  // setUserPhoto,
  logout: logoutThunk,
})(HeaderContainer);
