import React from 'react';

// React Components
import { Box, Container } from '@material-ui/core';

// Custom Components
import SideBar from '../common/SideBar';
import DashboardColumn from './DashboardColumn';

const Jobs = () => (
  <Container id="dashboard-container" disableGutters>
    <Box display="flex" flexDirection="row">
      <Box display="flex">
        <SideBar />
      </Box>
      <Box id="dashboard-columns" display="flex" flexGrow={1} justifyContent="space-between">
        <DashboardColumn>Interested</DashboardColumn>
        <DashboardColumn>Applied</DashboardColumn>
        <DashboardColumn>Interviewing</DashboardColumn>
        <DashboardColumn>Offers</DashboardColumn>
        <DashboardColumn>Rejected</DashboardColumn>
      </Box>
    </Box>

  </Container>
);

export default Jobs;
