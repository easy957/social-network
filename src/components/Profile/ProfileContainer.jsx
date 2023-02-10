import { connect } from "react-redux";
import Profile from "./Profile";
import s from "./Profile.module.css";
import {
  getStatusByIdThunk,
  getUserByIdThunk,
  updateStatusThunk,
} from "../../redux/profileReducer";
import React from "react";
import withRouter from "../common/withRouter";
import { compose } from "redux";
import withAuthRedirect from "../../HOC/withAuthRedirect";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = this.props.myId;
      if (!userId) {
        return;
      }
    }

    this.props.getUserById(userId);
    this.props.getStatusById(userId);
  }

  render() {
    return (
      <div className={s.wrapper}>
        <Profile
          profile={this.props.profile}
          status={this.props.status}
          updateStatus={this.props.updateStatus}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profilePage.currentProfile,
    status: state.profilePage.status,
    myId: state.auth.id,
  };
}

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, {
    getUserById: getUserByIdThunk,
    getStatusById: getStatusByIdThunk,
    updateStatus: updateStatusThunk,
  }),
  withRouter
)(ProfileContainer);
