import React, { Component } from 'react';
import './Messages.css';

class MessageItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.message.text,
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text,
    }));
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText);

    this.setState({ editMode: false });
  };

  render() {
    const { message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;

    return (
      <div className="modal-dialog">
      <div className="modal-content">
        <li className="sign_del">
          {editMode ? (
            <input
              className="input-header"
              type="text"
              value={editText}
              onChange={this.onChangeEditText}
            />
          ) : (
            <span>
              <div className="modal-header">
                {message.user.username || message.user.userId}
              </div>{' '}
              <div className="modal-header">
              {message.text} {message.editedAt && <span>(Edited)</span>}
              </div>
            </span>
          )}
          <div className="modal-footer">
          {editMode ? (
            <span>
              <button onClick={this.onSaveEditText} className="btn btn-warning">Save</button>
              <button onClick={this.onToggleEditMode} className="btn btn-warning">Reset</button>
            </span>
          ) : (
            <button onClick={this.onToggleEditMode} className="btn btn-warning">Edit</button>
          )}

          {!editMode && (
            <button
              type="button"
              onClick={() => onRemoveMessage(message.uid)}
              className="btn btn-warning"
            >
              Delete
            </button>
          )}
          </div>
        </li>
        </div>
      </div>
    );
  }
}

export default MessageItem;
