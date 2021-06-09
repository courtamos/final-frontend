import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// MaterialUI Components
import { Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FaceIcon from '@material-ui/icons/Face';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
// import { authSelector } from '../auth/authSlice';

// Custom Components
import axios from 'axios';
import { SideBarButton } from './SideBarButton';
import { JobsModal } from '../dashboard/Jobs-modal';

const useStyles = makeStyles({
  link: {
    color: 'black',
  },
  icon: {
    fontSize: '50px',
  },
  add: {
    color: 'black',
  },
});

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  // const { user } = useSelector(authSelector);
  const user = { id: '1' };

  const handleLogOut = () => {
    axios.delete('api/logout').then(() => {
      window.location.href = '/login';
    });
  };

  const handleClickOpen = () => {
    if (!open) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    if (open) {
      setOpen(false);
    }
  };

  return (
    <Box id="sidebar" display="flex" height="100vh">
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
                    <FaceIcon className={classes.icon} />
                  </Link>
                </SideBarButton>
                <SideBarButton onClick={handleClickOpen}>
                  <AddIcon className={`${classes.icon} ${classes.add}`} />
                </SideBarButton>
                <JobsModal open={open} onClose={handleClose} />
                <SideBarButton onClick={handleLogOut}>
                  <Link to={`/users/${user.id}`} className="link">
                    <ExitToAppIcon className={classes.icon} />
                  </Link>
                </SideBarButton>
              </>
            )
            : <></>}
        </Box>
      </Paper>
    </Box>
  );
};

SideBar.defaultProps = {
  onAddItem: () => {},
};

export default SideBar;
