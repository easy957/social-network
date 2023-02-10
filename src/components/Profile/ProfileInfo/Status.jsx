import React from "react";
import s from "./ProfileInfo.module.css";

class Status extends React.Component {
  state = {
    editMode: false,
    inputValue: this.props.status,
  };

  componentDidUpdate(prevProps, prevState) {
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

  toggleEditMode = (e) => {
    this.setState({
      editMode: !this.state.editMode,
    });
  };

  onInputChange(e) {
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
