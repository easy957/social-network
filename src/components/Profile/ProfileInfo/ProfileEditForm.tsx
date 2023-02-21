import { useState } from "react";
import { Field } from "redux-form";
import { FormControl } from "../../common/FormControl/FormControl";
import { required } from "../../utils/validate";
import formStyles from "../../common/FormControl/FormControl.module.css";
import s from "./ProfileEditForm.module.css";
import { ProfileType } from "../../../redux/types";

type PropsType = {
  handleSubmit: () => void;
  profile: ProfileType;
  error: string;
};

function ProfileEditForm({ handleSubmit, profile, error }: PropsType) {
  const [lookingForAJob, setLookingForAJob] = useState(profile.lookingForAJob);

  function setLinks() {
    const entries = Object.entries(profile.contacts);
    return entries.map((link) => {
      return (
        <Field
          key={link[0]}
          name={`contacts.${link[0]}`}
          component={FormControl}
          placeholder={link[0]}
        ></Field>
      );
    });
  }

  return (
    <form className={s.wrapper} onSubmit={handleSubmit}>
      <div>
        <div className={s.fieldsContainer}>
          <span>Full name: </span>
          <Field
            validate={[required]}
            name={"fullName"}
            component={FormControl}
            placeholder="enter your full name"
          />
        </div>
        <div>
          <span>Links: </span>
          {setLinks()}
        </div>
      </div>

      <div>
        <div className={s.fieldsContainer}>
          <span>About me: </span>
          <Field
            name={"aboutMe"}
            type="textarea"
            component={FormControl}
            placeholder="tell something about yourself"
          />
        </div>

        <div className={s.fieldsContainer}>
          <div className={s.lookingForContainer}>
            <span>Looking for a job? </span>
            <Field
              className={s.lookingForInput}
              onChange={() => {
                setLookingForAJob(!lookingForAJob);
              }}
              name={"lookingForAJob"}
              component={FormControl}
              type="checkbox"
            />
          </div>

          {lookingForAJob && (
            <>
              <span>Which job are you looking for? </span>
              <Field
                name={"lookingForAJobDescription"}
                type="textarea"
                component={FormControl}
                placeholder="tell something about yourself"
              />
            </>
          )}
          {error && <p className={formStyles.formError}>{error}</p>}
        </div>
        <button className={s.saveBtn}>Save</button>
      </div>
    </form>
  );
}

export default ProfileEditForm;
