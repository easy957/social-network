import s from "./ProfileInfo.module.css";
import photoPlaceHolder from "../../../assets/images/profilePicture.webp";
import Status from "./StatusWithHooks";
import Loader from "../../common/Loader";
import ProfileEditForm from "./ProfileEditForm";
import { reduxForm } from "redux-form";
import { ProfileType } from "../../../redux/types";
import { ChangeEvent, useEffect } from "react";
import { useAppDispatch } from "../../../redux/redux-store";
import {
  actions,
  getStatusByIdThunk,
  getUserByIdThunk,
  updateProfileThunk,
  updateStatusThunk,
  uploadPhotoThunk,
} from "../../../redux/profileReducer";
import { useSelector } from "react-redux";
import { getProfile, getStatus, getEditMode } from "../../../redux/profileSelector";
import { useParams } from "react-router-dom";
import { getMyId } from "../../../redux/authSelector";

type FormPropsType = {
  profile: ProfileType;
};

const ProfileReduxForm = reduxForm<ProfileType, FormPropsType>({
  form: "edit-profile",
})(ProfileEditForm);

function ProfileInfo() {
  const params = useParams();
  const isOwner = !params.userId;
  const profile = useSelector(getProfile);
  const status = useSelector(getStatus);
  const editMode = useSelector(getEditMode);
  const myId = useSelector(getMyId);

  // dispatch actions
  const dispatch = useAppDispatch();

  useEffect(() => {
    let userId: number | null;
    params.userId ? (userId = Number(params.userId)) : (userId = null);

    if (!userId) {
      userId = myId;
      if (!userId) {
        return;
      }
    }

    dispatch<any>(getUserByIdThunk(userId));
    dispatch<any>(getStatusByIdThunk(userId));
  }, [dispatch, myId, params.userId]);

  function handlePhotoChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) {
      dispatch<any>(uploadPhotoThunk(e.target.files[0]));
    }
  }
  function handleEditProfileSubmit(formData: ProfileType) {
    dispatch<any>(updateProfileThunk(formData));
  }
  function handleStatusChange(newStatus: string) {
    dispatch<any>(updateStatusThunk(newStatus));
  }
  function toggleEditMode() {
    dispatch(actions.setEditMode(!editMode));
  }

  // visuals
  function setPhoto() {
    if (!profile?.photos) return;
    return `${profile.photos.large === null ? photoPlaceHolder : profile.photos.large}`;
  }
  function setLinks() {
    if (!profile) return;
    const entries = Object.entries(profile.contacts);
    return entries.map((link) => {
      if (link[1]) {
        return (
          <li key={link[0]}>
            <a target="_blank" className={s.link} href={link[1]} rel="noreferrer">
              {link[0]}
            </a>
          </li>
        );
      }
      return undefined;
    });
  }
  function setLookingForJob() {
    if (!profile) return;
    if (profile.lookingForAJob) {
      return (
        <>
          <h3>Looking for a job: </h3>
          <p>{profile.lookingForAJobDescription}</p>
        </>
      );
    }
  }

  if (!profile) {
    return <Loader />;
  }

  return (
    <>
      <div className={s.profile}>
        <div>
          <img className={s.photo} src={setPhoto()} alt="Profile" />
          <div className={s.editButtons}>
            {isOwner && (
              <>
                <label className={s.uploadPhoto}>
                  Upload new photo
                  <input type="file" onChange={handlePhotoChange} />
                </label>
                {!editMode && (
                  <button className={s.editProfile} onClick={toggleEditMode}>
                    Edit Profile
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        {editMode ? (
          <ProfileReduxForm initialValues={profile} profile={profile} onSubmit={handleEditProfileSubmit} />
        ) : (
          <div>
            <h2 className={s.name}>{profile.fullName}</h2>
            <Status isOwner={isOwner} updateStatus={handleStatusChange} status={status} />
            <ul className={s.links}>{setLinks()}</ul>
            <p className={s.aboutMe}>{profile.aboutMe}</p>
            {setLookingForJob()}
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileInfo;
