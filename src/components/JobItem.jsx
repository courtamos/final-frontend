import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../features/auth/authSlice";

//MaterialUI Components
import { Box, Paper } from '@material-ui/core';
import { StylesProvider } from "@material-ui/core/styles";

//Custom Components

import './JobItem.scss';

export const JobItem = (props) => {

  return (
    <StylesProvider injectFirst>
      <Box height="100%" width="100%" className="container">
        <Paper elevation={1} square className="panel">
          <Box p={1} display="flex" flexGrow={1} flexDirection="row" height="100%" width="100%" alignItems="center">
            <Box display="flex" alignItems="center" justifyContent="center" className="logo" m={2}>
              {/* Fetch the icon from an api here */}
              <img src="../../img/facebook.png" alt="logo" width="75px"/>
            </Box>
            <Box>
              <h2>Company Name</h2>
              <p>Job Title</p>
              <p>Description</p>
            </Box>
          </Box>
        </Paper>  
      </Box>
    </StylesProvider>
  )
}