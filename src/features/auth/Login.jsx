/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box, FormControl, TextField, Button, Paper,
} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

import { authSelector, login } from './authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, loggingInStatus } = useSelector(authSelector);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
      <Paper className={classes.root}>
        {loggingInStatus === 'loading'
          && <LinearProgress />}
        <Box display="flex" justifyContent="center" mt={5}>
          <img src="../../img/Logo1.png" alt="logo" />
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center" p={5} width={300}>
          {error && (
          <Alert severity="error" fullWidth style={{ marginBottom: '10px' }}>
            {error}
          </Alert>
          )}
          <FormControl fullWidth>
            <TextField
              label="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              style={{ marginBottom: '10px' }}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Password</InputLabel>
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )}
            />
          </FormControl>
          <Box marginTop={5} marginBottom={3}>
            <Button variant="contained" color="secondary" onClick={handleLogin} fullWidth>Login</Button>
          </Box>
          <Link to="/signup" style={{ textAlign: 'center' }}>
            Don&apos;t have an account? Sign Up!
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
