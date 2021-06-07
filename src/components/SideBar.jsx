import React from 'react';
import { Box, Paper } from '@material-ui/core';

import { Link } from "react-router-dom";

import { StylesProvider } from "@material-ui/core/styles";

import { SideBarButton } from "./SideBarButton";
import FaceIcon from '@material-ui/icons/Face';
import AddIcon from '@material-ui/icons/Add';

import './SideBar.scss';

export const SideBar = (props) => {

  return (
    <StylesProvider injectFirst>
      <Box id="sidebar" display="flex" height="100%">
        <Paper elevation={1} square>
          <Box display="flex" flexGrow={1} flexDirection="column" height="100%">
            <SideBarButton>
              <Link to="/" className="link">
                <img src="../../img/Logo1.png" alt="logo" width="50px"/>
              </Link>
            </SideBarButton>
            <SideBarButton>
              <Link to="/profile" className="link">
                <FaceIcon className="icon"/>
              </Link>
            </SideBarButton>
            <SideBarButton onClick={ props.onAddItem }>
              <AddIcon className="icon add"/>
            </SideBarButton>
          </Box>
        </Paper>  
      </Box>
    </StylesProvider>
  )
}