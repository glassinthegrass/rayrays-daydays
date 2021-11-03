import React from "react";
import { Switch, Route } from "react-router-dom";
import Create from "../Components/Create/Create";
import Home from "../Components/Home/Home";
import { Login } from "../Components/Login/Login";
import PostView from "../Components/Post/PostView";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/create" component={Create} />
    <Route path="/posts/:post_id" component={PostView} />
  </Switch>
);
