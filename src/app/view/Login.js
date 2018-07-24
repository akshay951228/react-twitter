import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/app";
import "firebase/firestore";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from 'recompose'
import { authUser } from '../redux/actions'



class Login extends Component {
  state = {
    CurrentUser:null
  };
  uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: authResult => {
        var CurrentUser = {};
        CurrentUser["uid"] = authResult.uid;
        CurrentUser["photoURL"] = authResult.photoURL;
        CurrentUser["displayName"] = authResult.displayName;
        CurrentUser["email"] = authResult.email;
        CurrentUser["phoneNumber"] = authResult.phoneNumber;
        this.setState({CurrentUser})
        return false;
      }
    },
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //firebase.auth.EmailAuthProvider.PROVIDER_ID
    ]
  };
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var CurrentUser = {};
        CurrentUser["uid"] = user.uid;
        CurrentUser["photoURL"] = user.photoURL;
        CurrentUser["displayName"] = user.displayName;
        CurrentUser["email"] = user.email;
        CurrentUser["phoneNumber"] = user.phoneNumber;
        this.props.authUser(CurrentUser)
        this.props.history.push('/');
        }
    });
  }
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.props.auth_user) {
      return (
        <div>
          <h1>Please Login:</h1>
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      );
    }
    return (
      <div>
        <p>If you seeing this something is wrong</p>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { auth_user: state.auth_user };
};
const mapActions = {
  authUser: authUser
}
export default compose(
  connect(mapStateToProps, mapActions),
  withRouter
)(Login);