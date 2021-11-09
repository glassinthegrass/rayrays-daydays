import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";

const Header = ({ user, logout }) => {
  const path = useLocation().pathname;
  const back = useHistory().goBack;
  const backButton = path.includes("/posts") ? (
    <h1 onClick={() => back(-1)}>{"<"}</h1>
  ) : (
    <React.Fragment></React.Fragment>
  );
  let renderLinks = (
    <React.Fragment>
      {user.admin && (
        <React.Fragment>
          <Links activeClassName="active" exact to="/">
            Home
          </Links>
          <Links activeClassName="active" to="/create">
            Create
          </Links>
        </React.Fragment>
      )}
      <Links
        activeClassName={user.isLoggedIn ? "active" : ""}
        onClick={() => logout()}
        to="/login"
      >
        {user.isLoggedIn ? "Logout" : ""}
      </Links>
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
    width: 20rem;
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
  min-width: 20vw;
  overflow: hidden;
`;
export const Links = styled(NavLink)`
  @media (min-width: 425px) {
    font-size: 20px;
    text-align: center;
    margin: 5px;
    padding: calc(1rem - 2px);
  }
  text-decoration: none;
  font-size: 10px;
  &:hover {
    background-color: ${(props) => props.theme.yellow};
  }
  &.active {
    background-color: ${(props) => props.theme.purple};
  }
`;
