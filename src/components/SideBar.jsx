import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// MaterialUI Components
import { Box, Paper } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import FaceIcon from '@material-ui/icons/Face';
import AddIcon from '@material-ui/icons/Add';
import { authSelector } from '../features/auth/authSlice';

// Custom Components
import { SideBarButton } from './SideBarButton';

import './SideBar.scss';

const SideBar = (props) => {
  const { onAddItem } = props;

  const { user } = useSelector(authSelector);

  return (
    <StylesProvider injectFirst>
      <Box id="sidebar" display="flex" height="100%">
        <Paper elevation={1} square>
          <Box display="flex" flexGrow={1} flexDirection="column" height="100%">
            <SideBarButton>
              <Link to="/" className="link">
                <img src="../../img/Logo1.png" alt="logo" width="50px" />
              </Link>
            </SideBarButton>
            {user
              ? (
                <>
                  <SideBarButton>
                    <Link to={`/users/${user.id}`} className="link">
                      <FaceIcon className="icon" />
                    </Link>
                  </SideBarButton>
                  <SideBarButton onClick={onAddItem}>
                    <AddIcon className="icon add" />
                  </SideBarButton>
                </>
              )
              : <></>}
          </Box>
        </Paper>
      </Box>
    </StylesProvider>
  );
};

SideBar.propTypes = {
  onAddItem: PropTypes.func,
};

SideBar.defaultProps = {
  onAddItem: () => {},
};

export default SideBar;
