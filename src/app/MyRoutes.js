import React from "react";
import { Route } from "react-router-dom";
import Tweets from "./view/Tweets";
import Login from "./view/Login";
import UserTweets from "./view/UserTweets";
import TweetsReply from "./view/TweetsReply";

const MyRoutes = () => {
  return (
    <div>
      <Route exact path='/' component={Tweets} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/user/:id' component={UserTweets} />
      <Route exact path='/tweet/:id' component={TweetsReply} />

    </div>
  );
};

export default MyRoutes;