import { connect } from "react-redux";
import { compose } from "redux";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import { sendMessage } from "../../redux/messagesReducer";
import Messages from "./Messages";

const mapStateToProps = (state) => {
  return {
    state: state.messagesPage,
  };
};

export default compose(
  withAuthRedirect,

  connect(mapStateToProps, {
    sendMessage,
  })
)(Messages);
