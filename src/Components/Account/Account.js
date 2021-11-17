import React from 'react';
import styled from 'styled-components';
export const Account =({user,handleUser})=>{
    return<Main>
        <PageTitle>Account Info</PageTitle>
<AccountBox>
<Line>
<BigColumn>
    <LittleColumn>
<Row>
<Title>Name</Title>
<Info>{user.name}</Info>
</Row>
    </LittleColumn>
    <LittleColumn>
<Row>
<Title>Email</Title>
<Info>{user.email}</Info>
</Row>
<Edit>change email</Edit>
</LittleColumn>
<LittleColumn>
<Row>
<Title>password</Title>
<Info>*********</Info>
</Row>
<Edit>change password</Edit>
</LittleColumn>
</BigColumn>
</Line>
</AccountBox>

    </Main>
}
const Main=styled.section`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
width:100vw;
height:100vh;
`
const Row= styled.span`
display:flex;
justify-content:flex-start;
align-items:flex-end;
width:100%;
`
const BigColumn=styled.span`
display:flex;
flex-direction:column;
align-items:flex-start;
justify-content:flex-start;
height:calc(100% - 4rem);
width:100%;
padding:2rem;
`
const LittleColumn=styled(BigColumn)`
height:7%;
width:calc(100% - 4rem);
align-items:space-around;
`

const AccountBox=styled.div`
padding:3rem;
    margin-top:3rem;
    width:50rem;
    height:60vh;
  background-color:${props=>props.theme.pink};
  border-radius:3px;
`
const Line = styled.div`
height:calc(60vh);
width:calc(50rem);
border-radius:3px;
border:1px solid ${props=>props.theme.yellow};
display:flex;
justify-content:flex-start;
align-items:flex-start;
`
const Title= styled.p`
display:flex;
align-items:flex-end;
height:2rem;
justify-content:center;
width:10rem;
`
const Info = styled.h6`
background-color:${props=>props.theme.maroon};
color:${props=>props.theme.yellow};
width:100%;
height:2rem;
`
const PageTitle=styled.h1`
color:${props=>props.theme.maroon};
width:50rem;
font-size:50px;
text-align:center;
`

const Edit=styled.p`
font-size:13px;
width:100%;
text-align:right;
`