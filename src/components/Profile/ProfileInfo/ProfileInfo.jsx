import s from "./ProfileInfo.module.css";
import photoPlaceHolder from "../../../assets/images/profilePicture.webp";
import Status from "./StatusWithHooks";
import Loader from "../../common/Loader";
import ProfileEditForm from "./ProfileEditForm";
import { reduxForm } from "redux-form";

const ProfileReduxForm = reduxForm({
  form: "edit-profile",
})(ProfileEditForm);

function ProfileInfo({
  updateStatus,
  profile,
  status,
  uploadPhoto,
  isOwner,
  editMode,
  toggleEditMode,
  updateProfile,
}) {
  function setPhoto() {
    return `${
      profile.photos.large === null ? photoPlaceHolder : profile.photos.large
    }`;
  }

  function setLinks() {
    const entries = Object.entries(profile.contacts);
    return entries.map((link) => {
      if (link[1]) {
        return (
          <li key={link[0]}>
            <a
              target="_blank"
              className={s.link}
              href={link[1]}
              rel="noreferrer"
            >
              {link[0]}
            </a>
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
          <h3>Looking for a job: </h3>
          <p>{profile.lookingForAJobDescription}</p>
        </>
      );
    }
  }

  function handlePhotoChange(e) {
    if (e.target.files.length) {
      uploadPhoto(e.target.files[0]);
    }
  }

  function handleEditProfileSubmit(formData) {
    updateProfile(formData);
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
                  <button
                    className={s.editProfile}
                    onClick={() => {
                      toggleEditMode(!editMode);
                    }}
                  >
                    Edit Profile
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        {editMode ? (
          <ProfileReduxForm
            initialValues={profile}
            profile={profile}
            onSubmit={handleEditProfileSubmit}
          />
        ) : (
          <div>
            <h2 className={s.name}>{profile.fullName}</h2>
            <Status updateStatus={updateStatus} status={status} />
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
