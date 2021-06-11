import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';

// MaterialUI Components
import { Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import EventIcon from '@material-ui/icons/Event';
// import { authSelector } from '../auth/authSlice';

// Custom Components
import { logout } from '../auth/authSlice';
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
  imgicon: {
    padding: '20px',
  },
  initialsicon: {
    borderRadius: '50%',
  },
});

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  // const { user } = useSelector(authSelector);
  const user = { id: '1' };

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
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
        <Box display="flex" flexGrow={1} flexDirection="column" height="100%" alignItems="center">
          <img src="../../img/Logo1.png" alt="logo" width="50px" className={classes.imgicon} />
          {user
            ? (
              <>
                <SideBarButton>
                  <Link to={`/users/${user.id}`} className="link">
                    <img src="https://ui-avatars.com/api/?background=0D8ABC&color=fff" alt="initials" className={classes.initialsicon} />
                  </Link>
                </SideBarButton>
                <SideBarButton onClick={handleClickOpen}>
                  <AddIcon className={`${classes.icon} ${classes.add}`} />
                </SideBarButton>
                <SideBarButton onClick={() => { window.open('https://calendar.google.com/calendar/u/0/r', '_blank'); }}>
                  <EventIcon className={`${classes.icon} ${classes.add}`} />
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
