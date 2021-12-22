import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
export const LoginRequest = () => {
  const [info, setInfo] = useState({ email: "", name: "", relationship: "" });
  const [response, setResponse] = useState('');
  const handleEmail=async()=>{
        try{
          let message = await axios.post(`/api/request-login`,info)
          setResponse(message.data);
          setInfo({email: "", name: "", relationship: ""})
        }catch(err){
          console.log(err)
        }
  };
  const pressEnter=({key})=>{
    if(key==='Enter')handleEmail();
    }
  return (
    <LoginMain>
      <LoginBox>
        <Input
          value={info.email}
          placeholder="Your email"
          onChange={(e) => setInfo({ ...info, email: e.target.value })}
        />
        <Input
          value={info.name}
          placeholder="Your name"
          onChange={(e) => setInfo({ ...info, name: e.target.value })}
        />
        <Input
          value={info.relationship}
          placeholder="Your relationship to Reagan"
          onKeyPress={(e)=>pressEnter(e)}
          onChange={(e) => setInfo({ ...info, relationship: e.target.value })}
        />
        <Button onClick={()=>handleEmail(info)}>Request a Login</Button>
        <h1>{response}</h1>
      </LoginBox>
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

