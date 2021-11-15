import React, { useState } from "react";
import styled from "styled-components";
import { Redirect,useHistory } from "react-router-dom";
export const Login = ({ error,user, handleUser }) => {
  const [newUser, setNewUser] = useState({ email: "", password: "" });
const push = useHistory().push
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
        {console.log(error)}
        <div>
        <Button onClick={() => handleUser.login(newUser)}>Login</Button>
        <LoginRequest onClick={()=>push('/request-login')}>click here to request a login</LoginRequest>
        </div>
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
  height:15rem;
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
  font-size:20px;
  height: 3rem;
  display:flex;
  justify-content:center;
  align-items:center;
cursor:pointer;
  background-color: ${(props) => props.theme.yellow};
`;

const LoginRequest= styled.h1`
cursor:pointer;
margin:10px;
padding:5px;
width:15rem;
`