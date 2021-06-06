import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../features/auth/authSlice";

export const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useSelector(authSelector);

  return (
    <Route {...rest} render={() => {
      return user === null
        ? <Redirect to='/login' />
        : children
    }} />
  )
}