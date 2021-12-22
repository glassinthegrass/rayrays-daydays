import React, { useState } from "react";
import styled from "styled-components";
import { Redirect,useHistory } from "react-router-dom";
export const Login = ({ error,user, handleUser }) => {
  const [newUser, setNewUser] = useState({ email: "", password: "" });
const push = useHistory().push
  let redirect = user.isLoggedIn &&<Redirect to='/'/>;

const pressEnter=({key})=>{
if(key==='Enter')handleUser.login(newUser);
};

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
          onKeyPress={(e)=>pressEnter(e)}
        />


        <Button onClick={() => handleUser.login(newUser)}>Login</Button>
        <LoginRequest onClick={()=>push('/request-login')}>click here to request a login</LoginRequest>
      </LoginBox>
      {redirect}
    </LoginMain>
  );
};

const LoginMain = styled.section`
  ${(props) => props.theme.row};
  height: calc(100vh - 3rem);
  width: 100vw;
  margin-top:5rem;
  @media(min-width:425px){
    align-items: center;
    align-items:flex-start;
  };
`;
const LoginBox = styled.span`
  height:15rem;
  padding: 1rem;
  width:100%;
  ${(props) => props.theme.column};
  justify-content: space-around;
  background-color: ${(props) => props.theme.pink};
  @media(min-width:425px){
    width: 35rem;
  }
`;
const Input = styled.input`
height: 3rem;
margin: 0px;
padding: 0px;
width:calc(100% - 2rem);
@media(min-width:599px){
  width: 35rem;
  
}; 
`;
const Button = styled.div`
font-size:20px;
height: 3rem;
display:flex;
justify-content:center;
align-items:center;
width:calc(100% - 2rem);
cursor:pointer;
background-color: ${(props) => props.theme.yellow};
@media(min-width:599px){
    width: 35rem;
  } 
`;

const LoginRequest= styled.h1`
cursor:pointer;
margin:10px;
padding:5px;
width:15rem;
`