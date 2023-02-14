import { connect } from "react-redux";
import Profile from "./Profile";
import s from "./Profile.module.css";
import {
  getStatusByIdThunk,
  getUserByIdThunk,
  setEditMode,
  updateProfileThunk,
  updateStatusThunk,
  uploadPhotoThunk,
} from "../../redux/profileReducer.ts";
import React from "react";
import withRouter from "../common/withRouter";
import { compose } from "redux";
import withAuthRedirect from "../../HOC/withAuthRedirect";

class ProfileContainer extends React.Component {
  componentDidMount() {
    this.setProfile();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.router.params.userId !== this.props.router.params.userId) {
      this.setProfile();
    }
  }

  setProfile() {
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
          isOwner={!this.props.router.params.userId}
          profile={this.props.profile}
          status={this.props.status}
          updateStatus={this.props.updateStatus}
          uploadPhoto={this.props.uploadPhoto}
          editMode={this.props.editMode}
          toggleEditMode={this.props.toggleEditMode}
          updateProfile={this.props.updateProfile}
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
    editMode: state.profilePage.editMode,
  };
}

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, {
    getUserById: getUserByIdThunk,
    getStatusById: getStatusByIdThunk,
    updateStatus: updateStatusThunk,
    uploadPhoto: uploadPhotoThunk,
    toggleEditMode: setEditMode,
    updateProfile: updateProfileThunk,
  }),
  withRouter
)(ProfileContainer);
