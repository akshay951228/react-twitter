import React from "react";
import ReactDOM from "react-dom";
import firebase from 'firebase/app';
import "firebase/app";
import { Provider } from "react-redux";
import { firebaseConfig } from "./app/constants/firebaseConfig";
import registerServiceWorker from "./registerServiceWorker";
import App from './app/App'
import store from './app/redux/store'

firebase.initializeApp(firebaseConfig);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();