import React from 'react';
import {
  Box,
  FormControl,
  TextField,
  Button,
  Paper,
} from '@material-ui/core';

export const LoginDialog = () => {

  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={1} width={500}>
      <Paper>
        <Box display="flex" justifyContent="center" mt={5}>
          <img src="../../img/Logo1.png" alt="logo"/>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" p={5} width={500}>
          <FormControl>
            <TextField label="Email"></TextField>
            <TextField label="Password"></TextField>
            <Box display="flex" justifyContent="center" m={5}>
              <Button>Login</Button>
              <Button>Register</Button>
            </Box>
          </FormControl>
        </Box>
      </Paper>  
    </Box>
  )
}