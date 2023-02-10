import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import s from "./Profile.module.css";

function Profile({ updateStatus, profile, status }) {
  return (
    <>
      <div className={s.wrapper}>
        <ProfileInfo
          profile={profile}
          status={status}
          updateStatus={updateStatus}
        />
        <MyPostsContainer />
      </div>
    </>
  );
}

export default Profile;
