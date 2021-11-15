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
        }catch(err){
          console.log(err)
        }
  };
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
  font-size: 20px;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => props.theme.yellow};
`;
