import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import MessageList from './MessageList';

class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
      messages: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.onListenForMessages();
  }

  onListenForMessages = () => {
    this.setState({ loading: true });

    this.props.firebase
      .messages()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on('value', snapshot => {
        const messageObject = snapshot.val();

        if (messageObject) {
          const messageList = Object.keys(messageObject).map(key => ({
            ...messageObject[key],
            uid: key,
          }));

          this.setState({
            messages: messageList,
            loading: false,
          });
        } else {
          this.setState({ messages: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  onChangeText = event => {
    this.setState({ text: event.target.value });
    // console.log(event.target.value );
  };

  onCreateMessage = (event, authUser) => {

    this.props.firebase.messages().push({
      text: this.state.text,
      userId: this.props.firebase.auth.getUid(), // authUser.uid,
      createdAt: new Date()//this.props.firebase.serverValue.TIMESTAMP,
    });
    // console.log("USER", authUser.uid);

    this.setState({ text: '' });

    event.preventDefault();
  };

  onEditMessage = (message, text) => {


    this.props.firebase.message(message.uid).set({
      ...message,
      text,
      editedAt: new Date()//this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveMessage = uid => {
    this.props.firebase.message(uid).remove();
  };

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForMessages,
    );
  };

  render() {
    const { users } = this.props;
    const { text, messages, loading } = this.state;


    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {!loading && messages && (
              <button type="button" onClick={this.onNextPage} className="btn btn-primary btndop">
                More
              </button>
            )}

            {loading && <div>Loading ...</div>}

            {messages && (
              <MessageList
                messages={messages.map(message => ({
                  ...message,
                  user: users
                    ? users[message.userId]
                    : { userId: message.userId },
                }))}
                onEditMessage={this.onEditMessage.bind(this)}
                onRemoveMessage={this.onRemoveMessage.bind(this)}
              />
            )}

            {!messages && <div>There are no messages ...</div>}

            <form
              onSubmit={event =>
                this.onCreateMessage(event, authUser)
              }
            >
              <input
                type="text"
                value={text}
                onChange={this.onChangeText}
                className="form-control form-control-lg"
              />
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Messages);
