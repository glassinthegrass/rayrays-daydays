import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
const Header =(props)=>{
const push=useHistory().push
    return<StyledHeader>
<Spacer></Spacer>
<Title>RayRay's DayDay's</Title>
<Spacer as='h6'> <Links onClick={()=>push('/')}>home</Links><Links onClick={()=>push('/create')}>create</Links></Spacer>

    </StyledHeader>
}
export default Header

const StyledHeader=styled.header`
position:sticky;
top:0;
background-color:${props=>props.theme.pink};
height:3rem;
width:100%;
display:flex;
justify-content:space-around;
align-items:center;
`
const Title=styled.h1`
@media(min-width:425px){
    color:${props=>props.theme.purple};
    width:20rem;
    padding:3px;
    margin:5px;
    display:flex;
    justify-content:space-around;
    align-items:center;
    text-align:center;
    font-size:30px;
};
font-size:10px;
`

const Links =styled.div`
@media(min-width:425){

    font-size:20px;
    text-align:center;
    margin:5px;
    padding:5px;
}
font-size:10px;
`
const Spacer = styled.div`
display:flex;
justify-content:center;
width:20vw;
`