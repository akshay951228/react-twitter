import React from "react";
import { Route } from "react-router-dom";
import Tweets from "./view/Tweets";
import Login from "./view/Login";

const MyRoutes = () => {
  return (
    <div>
      <Route exact path='/' component={Tweets} />
      <Route exact path='/login' component={Login} />

    </div>
  );
};

export default MyRoutes;