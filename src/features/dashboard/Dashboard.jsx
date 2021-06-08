import React, { useState } from 'react';

// React Components
import { Box, Container } from '@material-ui/core';

// Custom Components
import SideBar from '../common/SideBar';
import DashboardColumn from './DashboardColumn';

const Jobs = () => {
  // Should be replaced if we are using redux
  const state = useState({
    items: [
      1, 2, 3, 4, 5,
    ],
  });
  return (
    <Container id="dashboard-container" disableGutters>
      <Box display="flex" flexDirection="row">
        <Box display="flex">
          <SideBar />
        </Box>
        <Box id="dashboard-columns" display="flex" flexGrow={1} justifyContent="space-between">
          <DashboardColumn items={state.items}>Interested</DashboardColumn>
          <DashboardColumn items={state.items}>Applied</DashboardColumn>
          <DashboardColumn items={state.items}>Interviewing</DashboardColumn>
          <DashboardColumn items={state.items}>Offers</DashboardColumn>
          <DashboardColumn items={state.items}>Rejected</DashboardColumn>
        </Box>
      </Box>

    </Container>
  );
};

export default Jobs;
