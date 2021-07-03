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
      'job-1': {
        id: 'task-1',
        content: 'Example Task',
      },
    },
    columns: {
      1: {
        id: 1,
        title: 'Interested',
        taskIds: ['job-1'],
      },
      2: {
        id: 2,
        title: 'Applied',
        taskIds: ['job-1'],
      },
      3: {
        id: 3,
        title: 'Interviewed',
        taskIds: ['job-1'],
      },
      4: {
        id: 4,
        title: 'Offered',
        taskIds: ['job-1'],
      },
      5: {
        id: 5,
        title: 'Rejected',
        taskIds: ['job-1'],
      },
    },
    columnOrder: [1, 2, 3, 4, 5],
  });

  const rebuildJobsDataState = (myjobs) => {
    /** This function will rebuild the state for react-beautful-dnd from the Redux store */
    if (!myjobs) {
      return null;
    }

    const result = {
      tasks: {
        1: {
          id: 1,
        },
      },
      columns: {
        1: {
          id: 1,
          title: 'Interested',
          taskIds: [],
        },
        2: {
          id: 2,
          title: 'Applied',
          taskIds: [],
        },
        3: {
          id: 3,
          title: 'Interviewed',
          taskIds: [],
        },
        4: {
          id: 4,
          title: 'Offered',
          taskIds: [],
        },
        5: {
          id: 5,
          title: 'Rejected',
          taskIds: [],
        },
      },
      columnOrder: [1, 2, 3, 4, 5],
    };

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

  useEffect(() => {
    setJobsData(rebuildJobsDataState(jobs));
  }, []);

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
  };

  const columns = jobsData.columnOrder.map((columnId) => {
    const column = jobsData.columns[columnId];
    const tasks = column.taskIds.map((taskId) => jobsData.tasks[taskId]);

    return <TestColumn key={column.id} column={column} tasks={tasks} />;
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
              {/* {status === 'failed' ? 'Something went wrong' : (
                <>
                  <Grid item xs={12} lg><Box display="flex"><DashboardColumn tickUrl="https://i.imgur.com/zOfNZr4.png" index={0} items={interestedJobs} title="Interested" color="#F9C74F" /></Box></Grid>
                  <Grid item xs={12} lg><Box display="flex"><DashboardColumn tickUrl="https://i.imgur.com/Ay2YdTb.png" index={1} items={appliedJobs} title="Applied" color="#f8961e" /></Box></Grid>
                  <Grid item xs={12} lg><Box display="flex"><DashboardColumn tickUrl="https://i.imgur.com/D54n1zR.png" index={2} items={interviewingJobs} title="Interviewing" color="#90be6d" /></Box></Grid>
                  <Grid item xs={12} lg><Box display="flex"><DashboardColumn tickUrl="https://i.imgur.com/rr4anU1.png" index={3} items={offerJobs} title="Offer" color="#43aa8b" /></Box></Grid>
                  <Grid item xs={12} lg><Box display="flex"><DashboardColumn tickUrl="https://i.imgur.com/36wyVZ1.png" index={4} items={rejectedJobs} title="Rejected" color="#f94144" /></Box></Grid>
                </>
              )} */}
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
