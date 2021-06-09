import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, Container } from '@material-ui/core';
import PropTypes from 'prop-types';
// import axios from 'axios';

// Custom Components
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
} from './jobs/jobsSlice';

const Dashboard = () => {
  // const { data } = props;
  // Dummy Data
  // const data = {
  //   interested: [{
  //     company: 'Facebook',
  //     title: 'Full-Stack Web Developer',
  //     description: 'Remote, Full Time',
  //     location: 'Calgary, AB',
  //   }],
  //   applied: [{
  //     company: 'Facebook',
  //     title: 'Full-Stack Web Developer',
  //     description: 'Remote, Full Time',
  //     location: 'Calgary, AB',
  //   }],
  //   interviewing: [{
  //     company: 'Facebook',
  //     title: 'Full-Stack Web Developer',
  //     description: 'Remote, Full Time',
  //     location: 'Calgary, AB',
  //   }],
  //   offer: [{
  //     company: 'Facebook',
  //     title: 'Full-Stack Web Developer',
  //     description: 'Remote, Full Time',
  //     location: 'Calgary, AB',
  //   }],
  //   rejected: [{
  //     company: 'Facebook',
  //     title: 'Full-Stack Web Developer',
  //     description: 'Remote, Full Time',
  //     location: 'Calgary, AB',
  //   }],
  // };

  const dispatch = useDispatch();
  const { status } = useSelector(jobsSelector);
  const interestedJobs = useSelector(selectInterestedJobs);
  const appliedJobs = useSelector(selectAppliedJobs);
  const interviewingJobs = useSelector(selectInterviewingJobs);
  const offerJobs = useSelector(selectOfferJobs);
  const rejectedJobs = useSelector(selectRejectedJobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

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
        <SideBar />
        <Box id="dashboard-columns" display="flex" flexGrow={1} justifyContent="space-between">
          <DashboardColumn items={interestedJobs} title="Interested" color="#ffe7d6" />
          <DashboardColumn items={appliedJobs} title="Applied" color="#ffa7a5" />
          <DashboardColumn items={interviewingJobs} title="Interviewing" color="#ee6a7c" />
          <DashboardColumn items={offerJobs} title="Offer" color="#ab5675" />
          <DashboardColumn items={rejectedJobs} title="Rejected" color="#73464f" />
        </Box>
      </Box>
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
