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
    <Container id="dashboard-container" disableGutters style={{ margin: '0px' }}>
      <Box display="flex" flexDirection="row" width="100vw">
        <SideBar userdata={user} />
        <Switch>
          <Route exact path="/dashboard">
            <Grid container id="dashboard-columns" display="flex" flexGrow={1} justifyContent="space-between">
              {status === 'failed' ? 'Something went wrong' : (
                <>
                  <Grid item xs={12} xl><DashboardColumn items={interestedJobs} title="Interested" color="#ffe7d6" /></Grid>
                  <Grid item xs={12} xl><DashboardColumn items={appliedJobs} title="Applied" color="#ffa7a5" /></Grid>
                  <Grid item xs={12} xl><DashboardColumn items={interviewingJobs} title="Interviewing" color="#ee6a7c" /></Grid>
                  <Grid item xs={12} xl>
                    <DashboardColumn items={offerJobs} title="Offer" color="#ab5675" />
                  </Grid>
                  <Grid item xs={12} xl><DashboardColumn items={rejectedJobs} title="Rejected" color="#73464f" /></Grid>
                </>
              )}
            </Grid>
          </Route>
          <Route path="/dashboard/search">
            <Search />
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
