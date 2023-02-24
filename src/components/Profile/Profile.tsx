import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import s from "./Profile.module.css";
import { ProfileType } from "../../redux/types";

type PropsType = {
  profile: ProfileType | null;
  status: string | null;
  isOwner: boolean;
  editMode: boolean;
  uploadPhoto: (photo: File) => void;
  toggleEditMode: (editMode: boolean) => void;
  updateProfile: (profile: ProfileType) => void;
  updateStatus: (status: string) => void;
};

function Profile({
  updateStatus,
  profile,
  status,
  uploadPhoto,
  isOwner,
  editMode,
  toggleEditMode,
  updateProfile,
}: PropsType) {
  return (
    <>
      <div className={s.wrapper}>
        <ProfileInfo
          profile={profile}
          isOwner={isOwner}
          status={status}
          updateStatus={updateStatus}
          uploadPhoto={uploadPhoto}
          editMode={editMode}
          toggleEditMode={toggleEditMode}
          updateProfile={updateProfile}
        />
        <MyPostsContainer />
      </div>
    </>
  );
}

export default Profile;
