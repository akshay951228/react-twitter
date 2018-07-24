import React, { Component, Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router } from "react-router-dom";
import Layout from './view/Layout'
import MyRoutes from './MyRoutes';
class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <CssBaseline />
          <Layout >
          <MyRoutes/>
          </Layout>
        </Fragment>
      </Router>
    );
  }
}

export default App;
