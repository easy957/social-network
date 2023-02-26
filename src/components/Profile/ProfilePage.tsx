import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import s from "./Profile.module.css";
import { compose } from "redux";
import withAuthRedirect from "../../HOC/withAuthRedirect";

function ProfilePage() {
  return (
    <>
      <div className={s.wrapper}>
        <ProfileInfo />
        <MyPostsContainer />
      </div>
    </>
  );
}

export default compose<React.ComponentType>(withAuthRedirect)(ProfilePage);
