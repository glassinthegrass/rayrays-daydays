import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
export const Login = ({ user, handleUser }) => {
  const [newUser, setNewUser] = useState({ email: "", password: "" });

  let redirect = user.isLoggedIn &&<Redirect to='/'/>;

  return (
    <LoginMain>
      <LoginBox>
        <Input
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          type="email"
          placeholder="Email Address"
        />
        <Input
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          type="password"
          placeholder="Password"
        />
        <Button onClick={() => handleUser.login(newUser)}>Login</Button>
      </LoginBox>
      {redirect}
    </LoginMain>
  );
};

const LoginMain = styled.section`
  ${(props) => props.theme.row};
  align-items: center;
  height: calc(100vh - 3rem);
  width: 100vw;
`;
const LoginBox = styled.span`
  height: 15rem;
  padding: 1rem;
  width: 35rem;
  ${(props) => props.theme.column};
  justify-content: space-around;
  background-color: ${(props) => props.theme.pink};
`;
const Input = styled.input`
  width: 35rem;
  height: 3rem;
  margin: 0px;
  padding: 0px;
`;
const Button = styled.div`
  width: 35rem;
  height: 3rem;
  background-color: ${(props) => props.theme.yellow};
`;
