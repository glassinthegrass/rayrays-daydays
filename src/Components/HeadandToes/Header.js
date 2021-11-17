import React from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";

const Header = ({ user, logout }) => {
  const path = useLocation().pathname;

  const back = useHistory().goBack;
  const backButton = path.includes("/posts") ||path.includes('/request-login')? (
    <h1 onClick={() => back(-1)}>{"<"}</h1>
  ) : (
    <React.Fragment></React.Fragment>
  );

const showCreate= user.admin && <Links activeClassName="active" to="/create">Create</Links>
const showLinks=user.isLoggedIn && (<React.Fragment><Links activeClassName="active" exact to="/">Home</Links>{showCreate}<Links activeClassName="active" to={`/account/${user.name}`}>Account</Links><Links onClick={() => logout()} to="/login">Logout</Links></React.Fragment>)
  let renderLinks = (
    <React.Fragment>
      {showLinks}
    </React.Fragment>
  );

  return (
    <StyledHeader>
      <Spacer>{backButton}</Spacer>
      <Title>RayRay's DayDay's</Title>
      <Spacer as="h6">{renderLinks}</Spacer>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.pink};
  height: 3rem;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Title = styled.h1`
  @media (min-width: 425px) {
    color: ${(props) => props.theme.purple};
    width: 33vw;
    padding: 3px;
    margin: 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    font-size: 30px;
  }
  font-size: 10px;
`;

const Spacer = styled.div`
  display: flex;
  justify-content: center;
  width: 33vw;
  
  @media(min-width:425px){
    width:20rem;
  };

`;
export const Links = styled(NavLink)`
display:flex;
align-items:center;
justify-content:center;
width:4rem;
text-decoration: none;
font-size: 10px;
text-align: center;
height:calc(3rem );
color:${props=>props.theme.purple};
&:hover {
  background-color: ${(props) => props.theme.yellow};
}
&.active {
  background-color: ${(props) => props.theme.purple};
  color:${props=>props.theme.yellow};
}
  @media (min-width: 425px) {
    font-size: 16px;
    margin: 5px;
    padding: calc(1rem );
    height:calc(1rem);
  }
  
`;
