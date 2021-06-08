/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from '../features/auth/authSlice';

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useSelector(authSelector);

  return (
    <Route
      {...rest}
      render={() => (user === null
        ? <Redirect to="/login" />
        : children)}
    />
  );
};

export default PrivateRoute;
