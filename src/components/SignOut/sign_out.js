
import React from 'react';
import './sign_out.css';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (


  <button type="button" className="btn btn-outline-warning" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);
