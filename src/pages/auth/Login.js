import React, { Component } from 'react';
import { isUserAuthenticated } from '../../helpers/authUtils';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  render() {
    if(isUserAuthenticated()) return <Redirect to="/"/>;
    return (
      <div>
        Login
      </div>
    );
  }
}

export default Login;
