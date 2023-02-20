import React, { FocusEvent, FormEvent, MouseEvent } from "react";
import s from "./ProfileInfo.module.css";

type PropsType = {
  status: string;
  updateStatus: (value: string) => void;
};

type StateType = {
  editMode: boolean;
  inputValue: string;
};

class Status extends React.Component<PropsType, StateType> {
  state: StateType = {
    editMode: false,
    inputValue: this.props.status,
  };

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        inputValue: this.props.status,
      });
    }

    if (
      prevState.editMode === true &&
      this.state.editMode === false &&
      prevProps.status !== this.state.inputValue
    ) {
      this.props.updateStatus(this.state.inputValue);
    }
  }

  toggleEditMode = (
    e: FocusEvent<HTMLInputElement> | MouseEvent<HTMLParagraphElement>
  ) => {
    this.setState({
      editMode: !this.state.editMode,
    });
  };

  onInputChange(e: FormEvent<HTMLInputElement>) {
    this.setState({
      inputValue: e.currentTarget.value,
    });
  }

  render() {
    return (
      <>
        {!this.state.editMode && (
          <p onDoubleClick={this.toggleEditMode} className={s.status}>
            {this.props.status || "(double click to edit your status)"}
          </p>
        )}
        {this.state.editMode && (
          <input
            className={s.statusInput}
            autoFocus
            onInput={this.onInputChange.bind(this)}
            onBlur={this.toggleEditMode}
            value={this.state.inputValue || ""}
          />
        )}
      </>
    );
  }
}

export default Status;
