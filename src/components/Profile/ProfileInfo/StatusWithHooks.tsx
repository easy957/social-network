import { FocusEvent, useEffect, useState } from "react";
import s from "./ProfileInfo.module.css";

type PropsType = {
  status: string | null;
  isOwner: boolean;
  updateStatus: (value: string) => void;
};

function Status({ status, updateStatus, isOwner }: PropsType) {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(status ? status : "");

  useEffect(() => {
    setValue(status ? status : "");
  }, [status]);

  function toggleEditMode() {
    if (!isOwner) return;

    if (editMode && status !== value) {
      updateStatus(value);
    }
    setEditMode(!editMode);
  }

  function onStatusInput({ currentTarget }: FocusEvent<HTMLInputElement>) {
    setValue(currentTarget.value);
  }

  return (
    <>
      {!editMode && (
        <p onDoubleClick={toggleEditMode} className={s.status}>
          {status || (isOwner && "(double click to edit your status)")}
        </p>
      )}

      {editMode && (
        <input value={value} onInput={onStatusInput} onBlur={toggleEditMode} className={s.statusInput} autoFocus />
      )}
    </>
  );
}

export default Status;
