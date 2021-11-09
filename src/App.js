import React, { useContext } from "react";
import { UserContext } from "./Context/UserProvider";
import "./reset.css";
import Header from "./Components/HeadandToes/Header";
import { Switch, Route} from "react-router-dom";
import Create from "./Components/Create/Create";
import Home from "./Components/Home/Home";
import { Login } from "./Components/Login/Login";
import PostView from "./Components/Post/PostView";
import styled from "styled-components";

const App = (props) => {
  const [user, { loading, error, handleUser }] = useContext(UserContext);

const loadScreen = loading?<Main>loading</Main>:<React.Fragment>
<Header logout={handleUser.logout} user={user} />
<Switch>
  <Route exact path="/" component={() => <Home user={user} />} />
  <Route
    path="/login"
    component={() => <Login handleUser={handleUser} user={user} />}
  />
  <Route path="/create" component={() => <Create user={user} />} />
  <Route
    path="/posts/:post_id"
    component={() => <PostView user={user} />}
  />
</Switch>
</React.Fragment>
  return <Main>{loadScreen}</Main>
};

export default App;

const Main = styled.main`
  background-color: ${(props) => props.theme.yellow};
  color: ${(props) => props.theme.maroon};
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
`;

