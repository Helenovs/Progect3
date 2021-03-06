import React, { Component } from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import Landing from '../Landing';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import PasswordForget from '../PasswordForget';
import Home from '../Home';
import Account from '../Account';
import ChatRoom from '../ChatRoom';
import Admin from '../Admin';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
// import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  // componentDidMount() {
  //   this.props.firebase.auth.onAuthStateChanged(authUser => {
  //     authUser
  //       ? this.setState({ authUser })
  //       : this.setState({ authUser: null });
  //   });
  // }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      },
    );
  }

  componentWillUnmount() {
    this.listener();
  }


  render() {
    return (
      <Router>
      <div>
        <Navigation authUser={this.state.authUser} />

        <hr />

        <Route exact path={ROUTES.LANDING} component={Landing} />
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.SIGN_IN} component={SignIn} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
        <Route path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.ACCOUNT} component={Account} />
        <Route path={ROUTES.CHATROOM} component={ChatRoom} />
        <Route path={ROUTES.ADMIN} component={Admin} />
      </div>
      </Router>
    );
  }
}

export default withFirebase(App);
