import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authSelector, login } from './authSlice';
import { Box, FormControl, TextField, Button, Paper } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';

const Login = () => {
  const dispatch = useDispatch();
  const { user, loggingInStatus } = useSelector(authSelector);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  // if statement to see if user exist -> if yes redirect to dashboard
  if (user) {
    return (
      <Redirect to='/dashboard' />
    )
  }

  const handleLogin = (event) => {
    if (!email || !password) {
      setError(true);
      return;
    }
    
    dispatch(login({email, password}));
    
    console.log('email: ', email);
    console.log('password: ', password);  
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Paper>
        {loggingInStatus === 'loading' &&
          <LinearProgress />
        }
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
              label="Email" 
              value={email} 
              onChange={event => setEmail(event.target.value)} 
            />
            <TextField 
              label="Password" 
              value={password} 
              onChange={event => setPassword(event.target.value)} 
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
  )
}

export default Login;