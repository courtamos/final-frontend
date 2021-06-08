import React from 'react';
import { Box, Container } from '@material-ui/core';
import PropTypes from 'prop-types';
// import axios from 'axios';

// Custom Components
import SideBar from '../common/SideBar';
import DashboardColumn from './DashboardColumn';

const Dashboard = () => {
  // const { data } = props;
  // Dummy Data
  const data = {
    interested: [{
      company: 'Facebook',
      title: 'Full-Stack Web Developer',
      description: 'Remote, Full Time',
      location: 'Calgary, AB',
    }],
    applied: [{
      company: 'Facebook',
      title: 'Full-Stack Web Developer',
      description: 'Remote, Full Time',
      location: 'Calgary, AB',
    }],
    interviewing: [{
      company: 'Facebook',
      title: 'Full-Stack Web Developer',
      description: 'Remote, Full Time',
      location: 'Calgary, AB',
    }],
    offer: [{
      company: 'Facebook',
      title: 'Full-Stack Web Developer',
      description: 'Remote, Full Time',
      location: 'Calgary, AB',
    }],
    rejected: [{
      company: 'Facebook',
      title: 'Full-Stack Web Developer',
      description: 'Remote, Full Time',
      location: 'Calgary, AB',
    }],
  };

  return (
    <Container id="dashboard-container" disableGutters style={{ margin: '0px' }}>
      <Box display="flex" flexDirection="row" width="100vw">
        <SideBar />
        <Box id="dashboard-columns" display="flex" flexGrow={1} justifyContent="space-between">
          <DashboardColumn items={data.interested} title="Interested" color="#ffe7d6" />
          <DashboardColumn items={data.applied} title="Applied" color="#ffa7a5" />
          <DashboardColumn items={data.interviewing} title="Interviewing" color="#ee6a7c" />
          <DashboardColumn items={data.offer} title="Offer" color="#ab5675" />
          <DashboardColumn items={data.rejected} title="Rejected" color="#73464f" />
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
