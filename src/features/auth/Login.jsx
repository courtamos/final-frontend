/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box, FormControl, TextField, Button, Paper,
} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';

import { authSelector, login } from './authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const { user, loggingInStatus } = useSelector(authSelector);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // if statement to see if user exist -> if yes redirect to dashboard
  if (user) {
    return (
      <Redirect to="/dashboard" />
    );
  }

  const handleLogin = async (event) => {
    if (!email || !password) {
      setError('Must include Email and Password');
      return;
    }

    const actionResult = await dispatch(login({ email, password }));

    if (login.rejected.match(actionResult)) {
      setError('Email or Password are incorrect');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Paper>
        {loggingInStatus === 'loading'
          && <LinearProgress />}
        <Box display="flex" justifyContent="center" mt={5}>
          <img src="../../img/Logo1.png" alt="logo" />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" p={5} width={300}>
          <FormControl fullWidth>
            {error && (
              <Alert severity="error">
                {error}
              </Alert>
            )}
            <TextField
              label="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Box display="flex" justifyContent="center" m={5}>
              <Button onClick={handleLogin}>Login</Button>
              <Button component={Link} to="/signup">
                Sign Up
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
