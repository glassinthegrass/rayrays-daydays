import React from "react";
import { UserContext } from "../Context/UserProvider";
import { Switch, Route } from "react-router-dom";
import Create from "../Components/Create/Create";
import Home from "../Components/Home/Home";
import { Login } from "../Components/Login/Login";
import PostView from "../Components/Post/PostView";

export default (
  <Switch>
    <Route exact path="/" component={()=><Home UserContext={UserContext}/>} />
    <Route path="/login" component={()=><Login UserContext={UserContext}/>}/>
    <Route path="/create" component={()=><Create UserContext={UserContext}/>} />
    <Route path="/posts/:post_id" component={()=><PostView UserContext={UserContext}/>} />
  </Switch>
);
