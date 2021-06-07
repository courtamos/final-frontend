import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../auth/authSlice';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <Button
        variant="contained"
        color="secondary"
        startIcon={<ExitToAppIcon />}
        onClick={handleLogout}
      >
        Logout
      </Button>
  )
}

export default Logout;
