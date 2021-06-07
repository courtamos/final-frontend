import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { authSelector, logout } from "../features/auth/authSlice";
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export const Logout = () => {
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