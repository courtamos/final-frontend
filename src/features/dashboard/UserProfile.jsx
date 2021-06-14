/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl, Button, Typography, Grid, Box,
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
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
    width: '250px',
    height: '250px',
  },
  sectionTitle: {
    marginTop: '20px',
    marginBottom: '10px',
  },
  nameTitle: {
    marginTop: '20px',
    marginBottom: '10px',
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
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper style={{ width: '100%', padding: '25px' }}>
        <Grid container>
          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column" p={2}>
              <img
                src={`https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=3b3b3b&color=fff&size=256`}
                alt="user initials"
                className={classes.initialsIcon}
              />
              <Typography variant="h4" className={classes.nameTitle}>{`${user.first_name} ${user.last_name}`}</Typography>
              <Typography variant="h5" style={{ marginBottom: '10px', marginTop: '0px' }}>
                Active Since
              </Typography>
              <Typography variant="body1" style={{ margin: '0px' }}>
                {formatDate(user.created_at)}
              </Typography>
              <Typography variant="h5" style={{ marginBottom: '10px', marginTop: '10px' }}>
                Total Number of Jobs
              </Typography>
              <Typography variant="body1" style={{ margin: '0px' }}>
                {jobs.length}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box display="flex" flexDirection="column" flexGrow={1} p={2}>
              {error && (
              <Alert severity="error" fullWidth style={{ marginBottom: '10px' }}>
                {error}
              </Alert>
              )}
              <Typography variant="h4" className={classes.sectionTitle} style={{ marginTop: '-5px' }}>Personal Information</Typography>
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
              <Typography variant="h4" className={classes.sectionTitle}>Email</Typography>
              <FormControl>
                <TextField
                  label="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  style={{ marginBottom: '10px' }}
                />
              </FormControl>
              <Typography variant="h4" className={classes.sectionTitle}>Password</Typography>
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
                color="secondary"
                onClick={() => { setModalOpen(true); }}
                style={{ marginTop: '25px', color: 'white' }}
              >
                Confirm Changes
              </Button>
              <UpdateModal
                id="modal-confirm-delete"
                open={modalOpen}
                onConfirm={handleUpdateConfirm}
                onDecline={handleUpdateDecline}
              />
            </Box>
          </Grid>
        </Grid>
        <Snackbar open={!!snack} autoHideDuration={6000} onClose={() => setSnack(false)}>
          <Alert onClose={() => setSnack(false)} severity="success">
            {snack}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default UserProfile;
