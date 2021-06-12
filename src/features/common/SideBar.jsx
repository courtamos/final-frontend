import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';

// MaterialUI Components
import { Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import EventIcon from '@material-ui/icons/Event';
import SearchIcon from '@material-ui/icons/Search';
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
    color: '#AB5675',
  },
  add: {
    color: '#AB5675',
  },
  imgicon: {
    padding: '20px',
  },
  initialsicon: {
    borderRadius: '50%',
  },
});

const SideBar = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const { userdata } = props;

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
          <SideBarButton>
            <Link to="/dashboard" className="link">
              <img src="../../img/Logo1.png" alt="logo" width="50px" className={classes.imgicon} />
            </Link>
          </SideBarButton>
          {user
            ? (
              <>
                <SideBarButton>
                  <Link to={`/users/${user.id}`} className="link">
                    <img src={`https://ui-avatars.com/api/?name=${userdata.first_name}+${userdata.last_name}&background=AB5675&color=fff`} alt="initials" className={classes.initialsicon} />
                  </Link>
                </SideBarButton>
                <SideBarButton onClick={handleClickOpen}>
                  <AddIcon className={`${classes.icon} ${classes.add}`} />
                </SideBarButton>
                <SideBarButton>
                  <Link to="/dashboard/search" className="link">
                    <SearchIcon className={`${classes.icon} ${classes.add}`} />
                  </Link>
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

SideBar.propTypes = {
  userdata: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
  }),
};

SideBar.defaultProps = {
  userdata: {
    first_name: 'Dave',
    last_name: 'Smith',
    email: 'dave.smith@email.com',
  },
};

export default SideBar;
