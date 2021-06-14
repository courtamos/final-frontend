/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, Grid, Container } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';

import Search from './Search';
import UserProfile from './UserProfile';
import JobStats from './JobStats';
import SideBar from '../common/SideBar';
import DashboardColumn from './DashboardColumn';
import {
  jobsSelector,
  fetchJobs,
  selectInterestedJobs,
  selectAppliedJobs,
  selectInterviewingJobs,
  selectOfferJobs,
  selectRejectedJobs,
  resetAddJobStatus,
  resetEditJobStatus,
  resetDeleteJobStatus,
} from './jobs/jobsSlice';
import {
  authSelector,
} from '../auth/authSlice';
import JobResources from './Drawer';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const {
    status, addJobStatus, editJobStatus, deleteJobStatus,
  } = useSelector(jobsSelector);
  const interestedJobs = useSelector(selectInterestedJobs);
  const appliedJobs = useSelector(selectAppliedJobs);
  const interviewingJobs = useSelector(selectInterviewingJobs);
  const offerJobs = useSelector(selectOfferJobs);
  const rejectedJobs = useSelector(selectRejectedJobs);
  const [snack, setSnack] = useState('');

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    if (addJobStatus === 'succeeded') {
      setSnack('Successfully Created!');
      dispatch(resetAddJobStatus());
    }
    if (editJobStatus === 'succeeded') {
      setSnack('Successfully Edited!');
      dispatch(resetEditJobStatus());
    }
    if (deleteJobStatus === 'succeeded') {
      setSnack('Successfully Deleted!');
      dispatch(resetDeleteJobStatus());
    }
  }, [addJobStatus, editJobStatus, deleteJobStatus]);

  const handleSnackClose = () => setSnack(false);

  if (status === 'loading') {
    return (
      <Backdrop open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Container id="dashboard-container" disableGutters style={{ margin: '0px' }} maxWidth={false}>
      <Box display="flex" flexDirection="row">
        <Switch>
          <Route exact path="/dashboard">
            <SideBar userdata={user} addButtonVisible />
            <Grid container id="dashboard-columns" display="flex" flexGrow={1} justifyContent="space-between" style={{ marginLeft: '70px' }}>
              {status === 'failed' ? 'Something went wrong' : (
                <>
                  <Grid item xs={12} lg><Box display="flex"><DashboardColumn tickUrl="https://i.imgur.com/zOfNZr4.png" index={0} items={interestedJobs} title="Interested" color="#F9C74F" /></Box></Grid>
                  <Grid item xs={12} lg><Box display="flex"><DashboardColumn tickUrl="https://i.imgur.com/Ay2YdTb.png" index={1} items={appliedJobs} title="Applied" color="#f8961e" /></Box></Grid>
                  <Grid item xs={12} lg><Box display="flex"><DashboardColumn tickUrl="https://i.imgur.com/D54n1zR.png" index={2} items={interviewingJobs} title="Interviewing" color="#90be6d" /></Box></Grid>
                  <Grid item xs={12} lg><Box display="flex"><DashboardColumn tickUrl="https://i.imgur.com/rr4anU1.png" index={3} items={offerJobs} title="Offer" color="#43aa8b" /></Box></Grid>
                  <Grid item xs={12} lg><Box display="flex"><DashboardColumn tickUrl="https://i.imgur.com/36wyVZ1.png" index={4} items={rejectedJobs} title="Rejected" color="#f94144" /></Box></Grid>
                </>
              )}
            </Grid>
          </Route>
          <Route path="/dashboard/search">
            <SideBar userdata={user} />
            <Grid style={{ marginLeft: '70px', width: '100vw' }} justifyContent="space-between">
              <Search />
            </Grid>
          </Route>
          <Route path="/dashboard/user_profile">
            <SideBar userdata={user} />
            <Grid style={{ marginLeft: '70px', width: '100vw' }} justifyContent="space-between">
              <UserProfile />
            </Grid>
          </Route>
          <Route path="/dashboard/job_stats">
            <SideBar userdata={user} />
            <Grid style={{ marginLeft: '70px', width: '100vw' }} justifyContent="space-between">
              <JobStats />
            </Grid>
          </Route>
        </Switch>
      </Box>
      <JobResources />
      <Snackbar open={!!snack} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity="success">
          {snack}
        </Alert>
      </Snackbar>
    </Container>
  );
};

Dashboard.propTypes = {
  data: PropTypes.shape({}),
};

Dashboard.defaultProps = {
  data: {},
};

export default Dashboard;
