import React from 'react';
import { Box, Button, Paper
} from '@material-ui/core';
import { StylesProvider } from "@material-ui/core/styles";

import { SideBarButton } from "./SideBarButton";
import FaceIcon from '@material-ui/icons/Face';
import AddIcon from '@material-ui/icons/Add';

import './SideBar.scss';

export const SideBar = () => {

  return (
    <StylesProvider injectFirst>
      <Box id="sidebar" display="flex" height="100%">
        <Paper>
          <Box display="flex" flexGrow={1} flexDirection="column" height="100%">
            <SideBarButton>
              <img src="../../img/Logo1.png" alt="logo" width="50px"/>
            </SideBarButton>
            <SideBarButton>
              <FaceIcon style={{ fontSize: 65 }}/>
            </SideBarButton>
            <SideBarButton>
              <AddIcon style={{ fontSize: 65 }}/>
            </SideBarButton>
          </Box>
        </Paper>  
      </Box>
    </StylesProvider>
  )
}