
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import './sign_out.css';

import { withFirebase } from '../Firebase';

class SignOutButton extends Component {
  signOut = () => {
    this.props.firebase.doSignOut()
    .then(() => {
      this.props.history.push(ROUTES.LANDING);
    });
  }

  render () {
    return(
      <button type="button" className="btn btn-outline-warning" onClick={ this.signOut }>
        Sign Out
      </button>
    );
  }
}
export default withRouter(withFirebase(SignOutButton));



//
// const SignOutButton = ({ firebase }) => (
//
//
//   <button type="button" className="btn btn-outline-warning" onClick={firebase.doSignOut}>
//     Sign Out
//   </button>
// );
//
// export default withFirebase(SignOutButton);
