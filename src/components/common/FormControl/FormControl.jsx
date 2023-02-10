import s from "./FormControl.module.css";

export function FormControl({
  type = "text",
  meta: { error, touched },
  input,
  ...restProps
}) {
  const notValid = touched && error;
  function getClasses() {
    return `${s.formControl} ${notValid ? s.error : ""}`;
  }
  return (
    <div className={getClasses()}>
      {type === "textarea" && <textarea {...input} {...restProps} />}
      {type === "text" && <input type="text" {...input} {...restProps} />}
      {type === "email" && <input type="email" {...input} {...restProps} />}
      {type === "password" && (
        <input type="password" {...input} {...restProps} />
      )}
      {type === "checkbox" && (
        <input type="checkbox" {...input} {...restProps} />
      )}
      {notValid && <span>{error}</span>}
    </div>
  );
}
