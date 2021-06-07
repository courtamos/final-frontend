import React from 'react';
import {
  Box,
  FormControl,
  TextField,
  Button,
  Paper,
} from '@material-ui/core';

export const RegisterDialog = () => {

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Paper>
        <Box display="flex" justifyContent="center" mt={5}>
          <img src="../../img/Logo1.png" alt="logo"/>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" p={5} width={300}>
          <FormControl fullWidth>
            <TextField label="First Name"></TextField>
            <TextField label="Last Name"></TextField>
            <TextField label="Email"></TextField>
            <TextField label="Password"></TextField>
            <TextField label="Password Confirmation"></TextField>
            <Box display="flex" justifyContent="center" m={5}>
              <Button>Register</Button>
            </Box>
          </FormControl>
        </Box>
      </Paper>  
    </Box>
  )
}