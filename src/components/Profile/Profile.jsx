import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import s from "./Profile.module.css";

function Profile({
  updateStatus,
  profile,
  status,
  uploadPhoto,
  isOwner,
  editMode,
  toggleEditMode,
  updateProfile,
}) {
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
