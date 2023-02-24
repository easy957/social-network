import { Field, Form, Formik } from "formik";
import { UsersFilterType } from "../../redux/usersReducer";

type PropTypes = {
  searchUsers: (filter: UsersFilterType) => void;
  filter: UsersFilterType;
};

type FormTypes = {
  term: string;
  friend: "null" | "true" | "false";
};

function UsersSearch({ searchUsers, filter }: PropTypes) {
  let timeout: any;

  function handleSubmit(values: FormTypes, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) {
    const filter: UsersFilterType = {
      term: values.term,
      friend: values.friend === "true" ? true : values.friend === "false" ? false : null,
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      searchUsers(filter);
    }, 750);

    setSubmitting(false);
  }

  const initialValues: FormTypes = {
    term: filter.term,
    friend: filter.friend === true ? "true" : filter.friend === false ? "false" : "null",
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting, submitForm, resetForm, setFieldValue }) => (
        <Form onChange={submitForm}>
          <Field type="text" name="term" placeholder="Search by name..." />
          <Field component="select" name="friend">
            <option value="null">All</option>
            <option value="true">Only friends</option>
            <option value="false">Only NOT a friends</option>
          </Field>
          <button
            type="button"
            onClick={() => {
              setFieldValue("friend", "null");
              setFieldValue("term", "");
              searchUsers({ term: "", friend: null });
            }}
          >
            Reset
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default UsersSearch;
