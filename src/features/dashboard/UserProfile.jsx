/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import UpdateModal from '../../components/UpdateModal';
import { authSelector } from '../auth/authSlice';
import { jobsSelector } from './jobs/jobsSlice';

const useStyles = makeStyles({
  initialsIcon: {
    width: '225px',
    height: '225px',
    marginRight: '50px',
  },
});

const UserProfile = () => {
  const classes = useStyles();
  const { user } = useSelector(authSelector);
  const { jobs } = useSelector(jobsSelector);

  const [first_name, setFirstName] = useState(user.first_name);
  const [last_name, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleUpdateConfirm = () => {
    setModalOpen(false);
  };

  const handleUpdateDecline = () => {
    setModalOpen(false);
  };

  return (
    <Container
      maxWidth="md"
      style={{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '25px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <img
            src={`https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=AB5675&color=fff`}
            alt="user initials"
            className={classes.initialsIcon}
          />
          <h2>{`${user.first_name} ${user.last_name}`}</h2>
          <h4>Active Since</h4>
          <p>{user.created_at}</p>
          <h4>Total Number of Jobs</h4>
          <p>{jobs.length}</p>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: '1',
        }}
        >
          <h3>Personal Information</h3>
          <FormControl>
            <TextField
              label="First Name"
              value={first_name}
              onChange={(event) => setFirstName(event.target.value)}
              style={{ marginBottom: '10px' }}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Last Name"
              value={last_name}
              onChange={(event) => setLastName(event.target.value)}
              style={{ marginBottom: '10px' }}
            />
          </FormControl>
          <h3>Email</h3>
          <FormControl>
            <TextField
              label="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              style={{ marginBottom: '10px' }}
            />
          </FormControl>
          <h3>Password</h3>
          <FormControl>
            <InputLabel>Password</InputLabel>
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Password Confirmation</InputLabel>
            <Input
              label="Password Confirmation"
              type={showPasswordConfirmation ? 'text' : 'password'}
              value={password_confirmation}
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPasswordConfirmation((prev) => !prev)}
                  >
                    {showPasswordConfirmation ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )}
            />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={() => { setModalOpen(true); }}
            style={{ marginTop: '25px' }}
          >
            Confirm Changes
          </Button>
          <UpdateModal
            id="modal-confirm-delete"
            open={modalOpen}
            onConfirm={handleUpdateConfirm}
            onDecline={handleUpdateDecline}
          />
        </div>
      </div>
    </Container>
  );
};

export default UserProfile;
