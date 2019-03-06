import React, { Component } from 'react';
// import { compose } from 'recompose';
import Messages from '../Messages';

import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';



class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    this.props.firebase.users().on('value', snapshot => {
      this.setState({
        users: snapshot.val(),
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    return (
      <div>
        <h1>CHATROOM</h1>
        <p>The ChatRoom is accessible by every signed in user.</p>

        <Messages users={this.state.users} />
      </div>
    );
  }
}

// const condition = authUser => !!authUser;

// export default withFirebase(withEmailVerification(withAuthorization(Home)));
export default withFirebase(Home);
