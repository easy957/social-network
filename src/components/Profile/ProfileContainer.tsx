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
} from "../../redux/profileReducer";
import React from "react";
import withRouter from "../common/withRouter";
import { compose } from "redux";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import { ProfileType, RouterPropsType } from "../../redux/types";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
  profile: ProfileType | null;
  status: string | null;
  myId: string | null;
  editMode: boolean;
};

type MapDispatchPropsType = {
  getUserById: (id: string) => void;
  getStatusById: (id: string) => void;
  uploadPhoto: (photo: any) => void;
  toggleEditMode: (editMode: boolean) => void;
  updateProfile: (profile: ProfileType) => void;
  updateStatus: (status: string) => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType & RouterPropsType;

class ProfileContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.setProfile();
  }

  componentDidUpdate(prevProps: PropsType) {
    if (prevProps.router.params.userId !== this.props.router.params.userId) {
      this.setProfile();
    }
  }

  setProfile() {
    let userId: string | null | undefined = this.props.router.params.userId;
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

function mapStateToProps(state: AppStateType): MapStatePropsType {
  return {
    profile: state.profilePage.currentProfile,
    status: state.profilePage.status,
    myId: state.auth.id,
    editMode: state.profilePage.editMode,
  };
}

export default compose(
  withAuthRedirect,
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(
    mapStateToProps,
    {
      getUserById: getUserByIdThunk,
      getStatusById: getStatusByIdThunk,
      updateStatus: updateStatusThunk,
      uploadPhoto: uploadPhotoThunk,
      toggleEditMode: setEditMode,
      updateProfile: updateProfileThunk,
    }
  ),
  withRouter
)(ProfileContainer);
