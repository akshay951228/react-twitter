import React from "react";
import { Route } from "react-router-dom";
import Tweets from "./view/Tweets";

const MyRoutes = () => {
  return (
    <div>
      <Route exact path='/' component={Tweets} />
    </div>
  );
};

export default MyRoutes;