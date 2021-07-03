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
import { DragDropContext } from 'react-beautiful-dnd';
import { sortedUniq } from 'lodash';
import Search from './Search';
import UserProfile from './UserProfile';
import JobStats from './JobStats';
import SideBar from '../common/SideBar';
import DashboardColumn from './DashboardColumn';
import TestColumn from './TestColumn';
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
  selectBeautifulJobs,
} from './jobs/jobsSlice';
import {
  authSelector,
} from '../auth/authSlice';
import JobResources from './Drawer';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const {
    status, addJobStatus, editJobStatus, deleteJobStatus, jobs,
  } = useSelector(jobsSelector);
  // const interestedJobs = useSelector(selectInterestedJobs);
  // const appliedJobs = useSelector(selectAppliedJobs);
  // const interviewingJobs = useSelector(selectInterviewingJobs);
  // const offerJobs = useSelector(selectOfferJobs);
  // const rejectedJobs = useSelector(selectRejectedJobs);
  const beautifulJobs = useSelector(selectBeautifulJobs);
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

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (destination.droppableId === source.droppableId
      && destination.index === source.index) {
      return;
    }

    const task = { ...beautifulJobs.tasks[source.droppableId] };
    task.state = source.droppableId - 1;

    const column = beautifulJobs.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);

    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...beautifulJobs,
      columns: {
        ...beautifulJobs.columns,
        [newColumn.id]: newColumn,
      },
    };

    // setBeautifulJobs(newState);
    // Perform our database update for that object
    dispatch(editJob({ jobId: source.id, job: task }));
  };

  const columns = beautifulJobs.columnOrder.map((columnId) => {
    const column = beautifulJobs.columns[columnId];
    const tasks = column.taskIds.map((taskId) => beautifulJobs.tasks[taskId]);
    return <DashboardColumn key={column.id} column={column} tasks={tasks} />;
  });

  return (
    <Container id="dashboard-container" disableGutters style={{ margin: '0px' }} maxWidth={false}>
      <Box display="flex" flexDirection="row">
        <Switch>
          <Route exact path="/dashboard">
            <SideBar userdata={user} addButtonVisible />
            <Grid container id="dashboard-columns" display="flex" flexGrow={1} justifyContent="space-between" style={{ marginLeft: '70px' }}>
              <DragDropContext
                onDragEnd={onDragEnd}
              >
                {columns}
              </DragDropContext>
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
