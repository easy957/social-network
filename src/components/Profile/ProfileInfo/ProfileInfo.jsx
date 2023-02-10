import s from "./ProfileInfo.module.css";
import photoPlaceHolder from "../../../assets/images/profilePicture.webp";
import Status from "./StatusWithHooks";
import Loader from "../../common/Loader";

function ProfileInfo({ updateStatus, profile, status }) {
  function setPhoto() {
    return `${
      profile.photos.large === null ? photoPlaceHolder : profile.photos.large
    }`;
  }

  function setLinks() {
    const entries = Object.entries(profile.contacts);
    return entries.map((link) => {
      if (link[1] !== null) {
        return (
          <li key={link[0]}>
            <a href={link[1]}>{link[0]}</a>
          </li>
        );
      }
      return undefined;
    });
  }

  function setLookingForJob() {
    if (profile.lookingForAJob) {
      return (
        <>
          <h3>Ищу работу</h3>
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
      {/* <img
      className={s.wallpaper}
      src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
      alt="Profile Background"
    /> */}
      <div className={s.profile}>
        <img className={s.photo} src={setPhoto()} alt="Profile" />
        <div>
          <h2 className={s.name}>{profile.fullName}</h2>
          <Status updateStatus={updateStatus} status={status} />
          <ul className={s.links}>{setLinks()}</ul>
          <p>{profile.aboutMe}</p>
          {setLookingForJob()}
        </div>
      </div>
    </>
  );
}

export default ProfileInfo;
