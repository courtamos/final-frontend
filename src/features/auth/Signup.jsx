import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authSelector, signup } from './authSlice';
import { Box, FormControl, TextField, Button, Paper } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';

const Signup = () => {
  const dispatch = useDispatch();
  const { user, signUpStatus } = useSelector(authSelector);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("")
  const [error, setError] = useState("");

  if (user) {
    return (
      <Redirect to='/dashboard' />
    );
  };

  const handleSignup = async (event) => {
    if (!first_name || !last_name || !email || !password || !password_confirmation) {
      setError("All fields must be filled out");
      return;
    };

    if (password !== password_confirmation) {
      setError("Passwords do not match");
      return;
    };

    const actionResult = await dispatch(signup({first_name, last_name, email, password, password_confirmation}));

    if (signup.rejected.match(actionResult)) {
      setError("Sign Up failed, try again")
      return;
    };
  };


  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Paper>
        {signUpStatus === 'loading' &&
          <LinearProgress />
        }
        <Box display="flex" justifyContent="center" mt={5}>
          <img src="../../img/Logo1.png" alt="logo"/>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" p={5} width={300}>
          <FormControl fullWidth>
            {error && (
              <Alert severity="error">
                {error}
              </Alert>
            )}
            <TextField 
              label="First Name" 
              value={first_name}
              onChange={event => setFirstName(event.target.value)}
            />
            <TextField 
              label="Last Name"
              value={last_name}
              onChange={event => setLastName(event.target.value)}
            />
            <TextField 
              label="Email" 
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            <TextField 
              label="Password" 
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
            <TextField 
              label="Password Confirmation" 
              value={password_confirmation}
              onChange={event => setPasswordConfirmation(event.target.value)}
            />
            <Box display="flex" justifyContent="center" m={5}>
              <Button onClick={handleSignup}>
                Sign Up
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Paper>  
    </Box>
  )
}

export default Signup;