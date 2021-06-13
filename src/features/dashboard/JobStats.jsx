/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

import {
  Chart,
  PieSeries,
  Title,
  Tooltip,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation, EventTracker, HoverState } from '@devexpress/dx-react-chart';

import {
  selectInterestedJobs,
  selectAppliedJobs,
  selectInterviewingJobs,
  selectOfferJobs,
  selectRejectedJobs,
} from './jobs/jobsSlice';

const styles = {
  titleText: {
    width: '80%',
    marginBottom: '30px',
  },
};

const TextComponent = withStyles(styles)(({ classes, ...restProps }) => (
  <Title.Text {...restProps} className={classes.titleText} />
));

const SalaryStats = () => {
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

  return (
    <Container
      maxWidth="md"
      style={{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '25px',
      }}
    >
      <Paper>
        <Chart
          data={chartData}
        >
          <PieSeries
            name="Job Application Stats"
            valueField="val"
            argumentField="status"
            innerRadius={0.6}
            style={{ width: '80%' }}
          />
          <Legend />
          <Title
            text="Job Application Stats"
            textComponent={TextComponent}
          />
          <Animation />
          <EventTracker />
          <HoverState />
          <Tooltip />
        </Chart>
      </Paper>
    </Container>
  );
};

export default SalaryStats;
