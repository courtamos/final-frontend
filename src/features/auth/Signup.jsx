/* eslint-disable camelcase */
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

import { authSelector, signup } from './authSlice';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
}));

const Signup = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, signUpStatus } = useSelector(authSelector);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  if (user) {
    return (
      <Redirect to="/dashboard" />
    );
  }

  const handleSignup = async () => {
    if (!first_name || !last_name || !email || !password || !password_confirmation) {
      setError('All fields must be filled out');
      return;
    }

    if (password !== password_confirmation) {
      setError('Passwords do not match');
      return;
    }

    const actionResult = await dispatch(signup({
      first_name, last_name, email, password, password_confirmation,
    }));

    if (signup.rejected.match(actionResult)) {
      setError('Sign Up failed, try again');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Paper className={classes.root}>
        {signUpStatus === 'loading'
          && <LinearProgress />}
        <Box display="flex" justifyContent="center" mt={5}>
          <img src="../../img/Logo1.png" alt="logo" />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" p={5} width={300}>
          <FormControl fullWidth>
            {error && (
            <Alert severity="error" fullWidth style={{ marginBottom: '10px' }}>
              {error}
            </Alert>
            )}
            <FormControl fullWidth>
              <TextField
                label="First Name"
                value={first_name}
                onChange={(event) => setFirstName(event.target.value)}
                style={{ marginBottom: '10px' }}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Last Name"
                value={last_name}
                onChange={(event) => setLastName(event.target.value)}
                style={{ marginBottom: '10px' }}
              />
            </FormControl>
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
                style={{ marginBottom: '10px' }}
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
            <FormControl fullWidth>
              <InputLabel>Password Confirmation</InputLabel>
              <Input
                label="Password Confirmation"
                type={showPasswordConfirmation ? 'text' : 'password'}
                value={password_confirmation}
                onChange={(event) => setPasswordConfirmation(event.target.value)}
                endAdornment={(
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPasswordConfirmation((prev) => !prev)}
                    >
                      {showPasswordConfirmation ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
              )}
              />
            </FormControl>
            <Box marginTop={5} marginBottom={3}>
              <Button variant="contained" color="secondary" onClick={handleSignup} fullWidth>Sign Up</Button>
            </Box>
            <Link to="/login" style={{ textAlign: 'center' }}>
              Already have an account? Login!
            </Link>
          </FormControl>
        </Box>
      </Paper>
    </Box>
  );
};

export default Signup;
