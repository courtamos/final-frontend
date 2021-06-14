/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
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

const JobStats = () => {
  const interestedJobs = useSelector(selectInterestedJobs);
  const appliedJobs = useSelector(selectAppliedJobs);
  const interviewingJobs = useSelector(selectInterviewingJobs);
  const offerJobs = useSelector(selectOfferJobs);
  const rejectedJobs = useSelector(selectRejectedJobs);

  const salariesNone = [];
  const salaries0 = [];
  const salaries1 = [];
  const salaries2 = [];
  const salaries3 = [];
  const salaries4 = [];
  const salaries5 = [];
  const salaries6 = [];
  const salaries7 = [];

  const salaryCount = (category) => {
    category.forEach((data) => {
      if (data.salary === null) {
        salariesNone.push(data.salary);
      }
      if (data.salary > 0 && data.salary < 25000) {
        salaries0.push(data.salary);
      } else if (data.salary >= 25000 && data.salary < 50000) {
        salaries1.push(data.salary);
      } else if (data.salary >= 50000 && data.salary < 75000) {
        salaries2.push(data.salary);
      } else if (data.salary >= 75000 && data.salary < 100000) {
        salaries3.push(data.salary);
      } else if (data.salary >= 100000 && data.salary < 125000) {
        salaries4.push(data.salary);
      } else if (data.salary >= 125000 && data.salary < 150000) {
        salaries5.push(data.salary);
      } else if (data.salary > 150000 && data.salary < 175000) {
        salaries6.push(data.salary);
      } else if (data.salary > 175000) {
        salaries7.push(data.salary);
      }
    });
  };

  salaryCount(interestedJobs);
  salaryCount(appliedJobs);
  salaryCount(interviewingJobs);
  salaryCount(offerJobs);
  salaryCount(rejectedJobs);

  const chartData = [
    { status: 'No Salary Data', val: salariesNone.length },
    { status: '$0 - $25k', val: salaries0.length },
    { status: '$25k - $50k', val: salaries1.length },
    { status: '$50k - $75k', val: salaries2.length },
    { status: '$75k - $100k', val: salaries3.length },
    { status: '$100k - $125k', val: salaries4.length },
    { status: '$125k - $150k', val: salaries5.length },
    { status: '$150k - $175k', val: salaries6.length },
    { status: '$175k+', val: salaries7.length },
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
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries
            name="Interested Jobs"
            valueField="val"
            argumentField="status"
            color="#ee6a7c"
          />
          <Title
            text="Salary Overview"
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

export default JobStats;
