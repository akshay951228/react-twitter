import React from "react";
import ReactDOM from "react-dom";
import firebase from 'firebase/app';
import "firebase/app";
import { firebaseConfig } from "./app/constants/firebaseConfig";
import registerServiceWorker from "./registerServiceWorker";
import App from './app/App'

firebase.initializeApp(firebaseConfig);
ReactDOM.render(
  <App/>,
  document.getElementById("root")
);
registerServiceWorker();