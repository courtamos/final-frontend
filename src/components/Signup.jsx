import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, signup } from "../features/auth/authSlice";
import { Box, FormControl, TextField, Button, Paper } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

export const Signup = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("")
  const [error, setError] = useState(false);

  // if statement to see if user exist -> if yes redirect to dashboard
  if (user) {
    return (
      <Redirect to='/dashboard' />
    )
  }

  const handleSignup = (event) => {
    if (!first_name || !last_name || !email || !password || !password_confirmation) {
      setError(true)
      return;
    }

    if (password !== password_confirmation) {
      setError(true)
      return;
    }

    dispatch(signup({first_name, last_name, email, password, password_confirmation}));
    console.log('s/u firstname: ', first_name);
    console.log('s/u lastname: ', last_name);
    console.log('s/u email: ', email);
    console.log('s/u password: ', password);
    console.log('s/u pass_conf: ', password_confirmation);
  }


  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Paper>
        <Box display="flex" justifyContent="center" mt={5}>
          <img src="../../img/Logo1.png" alt="logo"/>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" p={5} width={300}>
          <FormControl fullWidth>
            {error && (
              <Alert severity="error">
                Error message
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