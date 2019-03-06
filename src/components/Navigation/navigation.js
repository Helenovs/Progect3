import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);
const NavigationAuth = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="collapse navbar-collapse">
  <img src="../../../chat.png" className="navimg"/>
  <ul className="navbar-nav mr-auto">
    <li className="nav-item active">
      <Link to={ROUTES.HOME } className="nav-link">ChatRoom</Link>
    </li>

    <li className="nav-item active">
      <Link to={ROUTES.CHATROOM} className="nav-link">Users</Link>
    </li>

    <li className="nav-item active">
      <SignOutButton />
    </li>
  </ul>
  </div>
  </nav>
);

const NavigationNonAuth = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="collapse navbar-collapse">
  <img src="../../../chat.png" className="navimg"/>
  <ul className="navbar-nav mr-auto">
    <li className="nav-item active">
      <Link to={ROUTES.LANDING} className="nav-link">Landing</Link>
    </li>
    <li className="nav-item active">
      <Link to={ROUTES.SIGN_IN} className="nav-link">Sign In</Link>
    </li>
  </ul>
  </div>
  </nav>
);






// const Navigation = () => (
//   <div>
//       <ul>
//         <li>
//           <Link to={ROUTES.SIGN_IN}>Sign In</Link>
//         </li>
//         <li>
//           <Link to={ROUTES.LANDING}>Landing</Link>
//         </li>
//         <li>
//           <Link to={ROUTES.HOME}>Home</Link>
//         </li>
//         <li>
//           <Link to={ROUTES.ACCOUNT}>Account</Link>
//         </li>
//         <li>
//           <Link to={ROUTES.ADMIN}>Admin</Link>
//         </li>
//         <li>
//         <SignOutButton />
//       </li>
//       </ul>
//     </div>
// );

export default Navigation;
