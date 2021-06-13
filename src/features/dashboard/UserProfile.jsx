/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import UpdateModal from '../../components/UpdateModal';
import { authSelector, updateUser } from '../auth/authSlice';
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
  const dispatch = useDispatch();
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
  const [error, setError] = useState('');
  const [snack, setSnack] = useState('');

  const handleUpdateConfirm = async () => {
    setModalOpen(false);

    if (!first_name || !last_name || !email || !password || !password_confirmation) {
      setError('All fields must be filled out');
      return;
    }

    if (password !== password_confirmation) {
      setError('Passwords do not match');
      return;
    }

    const actionResult = await dispatch(updateUser({
      userId: user.id, first_name, last_name, email, password, password_confirmation,
    }));

    if (updateUser.rejected.match(actionResult)) {
      setError('Updating failed, try again');
      return;
    }

    setPassword('');
    setPasswordConfirmation('');
    setSnack('Successfully Updated User!');
  };

  const handleUpdateDecline = () => {
    setModalOpen(false);
  };

  const formatDate = (string) => {
    const date = new Date(string);
    return `${date.getMonth()}-${date.getDay()}-${date.getFullYear()}`;
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
            src={`https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=AB5675&color=fff&size=256`}
            alt="user initials"
            className={classes.initialsIcon}
          />
          <h2>{`${user.first_name} ${user.last_name}`}</h2>
          <h4 style={{ marginBottom: '10px', marginTop: '0px' }}>
            Active Since
          </h4>
          <p style={{ margin: '0px' }}>
            {formatDate(user.created_at)}
          </p>
          <h4 style={{ marginBottom: '10px', marginTop: '20px' }}>
            Total Number of Jobs
          </h4>
          <p style={{ margin: '0px' }}>
            {jobs.length}
          </p>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: '1',
        }}
        >
          {error && (
          <Alert severity="error" fullWidth style={{ marginBottom: '10px' }}>
            {error}
          </Alert>
          )}
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
      <Snackbar open={!!snack} autoHideDuration={6000} onClose={() => setSnack(false)}>
        <Alert onClose={() => setSnack(false)} severity="success">
          {snack}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserProfile;
