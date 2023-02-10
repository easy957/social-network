import { useEffect, useState } from "react";
import s from "./ProfileInfo.module.css";

function Status({ status, updateStatus }) {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(status);

  useEffect(() => {
    setValue(status);
  }, [status]);

  function toggleEditMode() {
    if (editMode && status !== value) {
      updateStatus(value);
    }
    setEditMode(!editMode);
  }

  function onStatusInput({ currentTarget }) {
    setValue(currentTarget.value);
  }

  return (
    <>
      {!editMode && (
        <p onDoubleClick={toggleEditMode} className={s.status}>
          {status || "(double click to edit your status)"}
        </p>
      )}

      {editMode && (
        <input
          value={value}
          onInput={onStatusInput}
          onBlur={toggleEditMode}
          className={s.statusInput}
          autoFocus
        />
      )}
    </>
  );
}

export default Status;
