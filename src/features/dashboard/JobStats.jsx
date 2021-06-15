/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {
  Chart,
  PieSeries,
  Tooltip,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import {
  Animation, EventTracker, HoverState, Palette,
} from '@devexpress/dx-react-chart';

import SalaryStats from './SalaryStats';
import {
  selectInterestedJobs,
  selectAppliedJobs,
  selectInterviewingJobs,
  selectOfferJobs,
  selectRejectedJobs,
} from './jobs/jobsSlice';

const JobStats = () => {
  const interestedJobs = useSelector(selectInterestedJobs);
  const appliedJobs = useSelector(selectAppliedJobs);
  const interviewingJobs = useSelector(selectInterviewingJobs);
  const offerJobs = useSelector(selectOfferJobs);
  const rejectedJobs = useSelector(selectRejectedJobs);

  const chartData = [
    { status: 'Interested Jobs', val: interestedJobs.length },
    { status: 'Applied Jobs', val: appliedJobs.length },
    { status: 'Interviewing Jobs', val: interviewingJobs.length },
    { status: 'Offered Jobs', val: offerJobs.length },
    { status: 'Rejected Jobs', val: rejectedJobs.length },
  ];

  const jobPalette = ['#F9C74F', '#F8961E', '#90BE6D', '#43AA8B', '#F94144'];

  return (
    <Container
      maxWidth="md"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '35px',
        marginBottom: '35px',
      }}
    >
      <Paper style={{ width: '100%', padding: '25px' }}>
        <Box mb={4} display="flex" justifyContent="center" alignContent="center">
          <Typography style={{ fontWeight: '600' }} variant="h4">
            Job Application Status
          </Typography>
        </Box>
        <Box mb={5}>
          <Chart
            data={chartData}
          >
            <Palette scheme={jobPalette} />
            <PieSeries
              name="Job Application Stats"
              valueField="val"
              argumentField="status"
              innerRadius={0.6}
              style={{ width: '80%' }}
            />
            <Legend />
            <Animation />
            <EventTracker />
            <HoverState />
            <Tooltip />
          </Chart>
        </Box>
        <Box mb={4} display="flex" justifyContent="center" alignContent="center">
          <Typography style={{ fontWeight: '600' }} variant="h4">
            Salary Overview
          </Typography>
        </Box>
        <Box>
          <SalaryStats />
        </Box>
      </Paper>
    </Container>
  );
};

export default JobStats;
