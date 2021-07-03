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
  const interestedJobs = useSelector(selectInterestedJobs);
  const appliedJobs = useSelector(selectAppliedJobs);
  const interviewingJobs = useSelector(selectInterviewingJobs);
  const offerJobs = useSelector(selectOfferJobs);
  const rejectedJobs = useSelector(selectRejectedJobs);
  const [snack, setSnack] = useState('');

  // This is the shape our data needs to be in for react-beautiful-dnd
  const [jobsData, setJobsData] = useState({
    tasks: {
      1: {
        id: 1,
      },
    },
    columns: {
      1: {
        id: 1,
        title: 'Interested',
        tickUrl: 'https://i.imgur.com/zOfNZr4.png',
        taskIds: [],
      },
      2: {
        id: 2,
        title: 'Applied',
        tickUrl: 'https://i.imgur.com/Ay2YdTb.png',
        taskIds: [],
      },
      3: {
        id: 3,
        title: 'Interviewed',
        tickUrl: 'https://i.imgur.com/D54n1zR.png',
        taskIds: [],
      },
      4: {
        id: 4,
        title: 'Offered',
        tickUrl: 'https://i.imgur.com/rr4anU1.png',
        taskIds: [],
      },
      5: {
        id: 5,
        title: 'Rejected',
        tickUrl: 'https://i.imgur.com/36wyVZ1.png',
        taskIds: [],
      },
    },
    columnOrder: [1, 2, 3, 4, 5],
  });

  const rebuildJobsDataState = (myjobs) => {
    /** This function will rebuild the state for react-beautful-dnd from the Redux store */
    if (!myjobs) {
      return null;
    }

    const result = { ...jobsData };

    // Build list of tasks
    myjobs.forEach((job) => {
      result.tasks[job.id] = job;
    });

    // Build the task ID Lists
    const taskIdLists = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
    };

    interestedJobs.forEach((job) => {
      taskIdLists[1].push(job.id);
    });

    appliedJobs.forEach((job) => {
      taskIdLists[2].push(job.id);
    });

    interviewingJobs.forEach((job) => {
      taskIdLists[3].push(job.id);
    });

    offerJobs.forEach((job) => {
      taskIdLists[4].push(job.id);
    });

    rejectedJobs.forEach((job) => {
      taskIdLists[5].push(job.id);
    });

    result.columns[1].taskIds = [...taskIdLists[1]];
    result.columns[2].taskIds = [...taskIdLists[2]];
    result.columns[3].taskIds = [...taskIdLists[3]];
    result.columns[4].taskIds = [...taskIdLists[4]];
    result.columns[5].taskIds = [...taskIdLists[5]];

    return result;
  };

  useEffect(() => {
    dispatch(fetchJobs());
    setJobsData(rebuildJobsDataState(jobs));
  }, [dispatch]);

  // useEffect(() => {
  //   setJobsData(rebuildJobsDataState(jobs));
  // }, []);

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

    const task = { ...jobsData.tasks[source.droppableId] };
    task.index = destination.index;
    jobsData.tasks[source.droppableId] = task;

    const column = jobsData.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);

    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...jobsData,
      columns: {
        ...jobsData.columns,
        [newColumn.id]: newColumn,
      },
    };

    setJobsData(newState);
    // Perform our database update for that object
    dispatch(editJob({ jobId: source.id, job: task }));
  };

  const columns = jobsData.columnOrder.map((columnId) => {
    const column = jobsData.columns[columnId];
    const tasks = column.taskIds.map((taskId) => jobsData.tasks[taskId]);
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
