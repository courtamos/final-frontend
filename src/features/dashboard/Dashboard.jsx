import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, Grid, Container } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';

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
  editJob,
} from './jobs/jobsSlice';
import {
  authSelector,
} from '../auth/authSlice';

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
  const [error, setError] = useState('');

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

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (destination.droppableId === source.droppableId
      && destination.index === source.index) {
      return;
    }

    const patchParams = { index: destination.index, status: destination.droppableId - 1 };
    console.log(destination.index, source.index);
    const actionResult = await dispatch(editJob({ jobId: draggableId, job: patchParams }));

    if (editJob.rejected.match(actionResult)) {
      setError('Could not add item to column, please try again');
    }
  };

  return (
    <Container id="dashboard-container" disableGutters style={{ margin: '0px' }}>

      <Box display="flex" flexDirection="row" width="100vw">
        <SideBar userdata={user} />
        <Switch>
          <Route exact path="/dashboard">
            <DragDropContext onDragEnd={onDragEnd}>
              <Box display="flex" flexDirection="column">
                <Box display="fixed">
                  {error && (
                  <Alert severity="error" fullWidth style={{ marginBottom: '10px' }}>
                    {error}
                  </Alert>
                  )}
                </Box>
                <Grid container id="dashboard-columns" display="flex">
                  {status === 'failed' ? 'Something went wrong' : (
                    <>
                      <Grid item xs={12} xl><DashboardColumn colId="1" items={interestedJobs} title="Interested" color="#ffe7d6" /></Grid>
                      <Grid item xs={12} xl><DashboardColumn colId="2" items={appliedJobs} title="Applied" color="#ffa7a5" /></Grid>
                      <Grid item xs={12} xl><DashboardColumn colId="3" items={interviewingJobs} title="Interviewing" color="#ee6a7c" /></Grid>
                      <Grid item xs={12} xl>
                        <DashboardColumn colId="4" items={offerJobs} title="Offer" color="#ab5675" />
                      </Grid>
                      <Grid item xs={12} xl><DashboardColumn colId="5" items={rejectedJobs} title="Rejected" color="#73464f" /></Grid>
                    </>
                  )}
                </Grid>
              </Box>
            </DragDropContext>
          </Route>
          <Route path="/dashboard/search">
            <Search />
          </Route>
        </Switch>
      </Box>
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
