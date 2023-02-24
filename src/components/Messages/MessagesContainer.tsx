import { connect } from "react-redux";
import { compose } from "redux";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import { actions } from "../../redux/messagesReducer";
import Messages from "./Messages";
import { AppStateType } from "../../redux/redux-store";

const mapStateToProps = (state: AppStateType) => {
  return {
    state: state.messagesPage,
  };
};

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  sendMessage: (message: string) => void;
};

export default compose<React.ComponentType>(
  withAuthRedirect,

  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    sendMessage: actions.sendMessage,
  })
)(Messages);
