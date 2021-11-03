import React from "react";
import styled from "styled-components";
import { useLocation, Redirect } from "react-router-dom";
export const Login = (props) => {
  const isLoggedIn = true;
  const to = useLocation().state;
  let redirect = isLoggedIn && <Redirect to={to} />;

  return <>{redirect}</>;
};
