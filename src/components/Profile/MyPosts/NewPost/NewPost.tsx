import React from "react";
import { Field, InjectedFormProps } from "redux-form";
import { FormControl } from "../../../common/FormControl/FormControl";
import { maxLength, required } from "../../../utils/validate";

const maxLength50 = maxLength(50);

function NewPost({ handleSubmit }: InjectedFormProps<{ newPost: string }>) {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        component={FormControl}
        type="textarea"
        name="newPost"
        validate={[maxLength50, required]}
        placeholder="Create new post."
      />
      <button>Add Post</button>
    </form>
  );
}

export default NewPost;
