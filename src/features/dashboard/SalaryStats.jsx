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

  const salaries0 = [];
  const salaries1 = [];
  const salaries2 = [];
  const salaries3 = [];
  const salaries4 = [];
  const salaries5 = [];
  const salaries6 = [];

  interestedJobs.forEach((data) => {
    if (data.salary < 35000) {
      salaries0.push(data.salary);
    } else if (data.salary >= 35000 && data.salary < 50000) {
      salaries1.push(data.salary);
    } else if (data.salary >= 50000 && data.salary < 75000) {
      salaries2.push(data.salary);
    } else if (data.salary >= 75000 && data.salary < 90000) {
      salaries3.push(data.salary);
    } else if (data.salary >= 90000 && data.salary < 105000) {
      salaries4.push(data.salary);
    } else if (data.salary > 105000 && data.salary < 135000) {
      salaries5.push(data.salary);
    } else if (data.salary > 135000) {
      salaries6.push(data.salary);
    }
  });

  appliedJobs.forEach((data) => {
    if (data.salary < 35000) {
      salaries0.push(data.salary);
    } else if (data.salary >= 35000 && data.salary < 50000) {
      salaries1.push(data.salary);
    } else if (data.salary >= 50000 && data.salary < 75000) {
      salaries2.push(data.salary);
    } else if (data.salary >= 75000 && data.salary < 90000) {
      salaries3.push(data.salary);
    } else if (data.salary >= 90000 && data.salary < 105000) {
      salaries4.push(data.salary);
    } else if (data.salary > 105000 && data.salary < 135000) {
      salaries5.push(data.salary);
    } else if (data.salary > 135000) {
      salaries6.push(data.salary);
    }
  });

  interviewingJobs.forEach((data) => {
    if (data.salary < 35000) {
      salaries0.push(data.salary);
    } else if (data.salary >= 35000 && data.salary < 50000) {
      salaries1.push(data.salary);
    } else if (data.salary >= 50000 && data.salary < 75000) {
      salaries2.push(data.salary);
    } else if (data.salary >= 75000 && data.salary < 90000) {
      salaries3.push(data.salary);
    } else if (data.salary >= 90000 && data.salary < 105000) {
      salaries4.push(data.salary);
    } else if (data.salary > 105000 && data.salary < 135000) {
      salaries5.push(data.salary);
    } else if (data.salary > 135000) {
      salaries6.push(data.salary);
    }
  });

  offerJobs.forEach((data) => {
    if (data.salary < 35000) {
      salaries0.push(data.salary);
    } else if (data.salary >= 35000 && data.salary < 50000) {
      salaries1.push(data.salary);
    } else if (data.salary >= 50000 && data.salary < 75000) {
      salaries2.push(data.salary);
    } else if (data.salary >= 75000 && data.salary < 90000) {
      salaries3.push(data.salary);
    } else if (data.salary >= 90000 && data.salary < 105000) {
      salaries4.push(data.salary);
    } else if (data.salary > 105000 && data.salary < 135000) {
      salaries5.push(data.salary);
    } else if (data.salary > 135000) {
      salaries6.push(data.salary);
    }
  });

  rejectedJobs.forEach((data) => {
    if (data.salary < 50000) {
      salaries0.push({ val: data.salary });
    } else if (data.salary >= 50000 && data.salary < 75000) {
      salaries1.push(data.salary);
    } else if (data.salary >= 75000 && data.salary < 100000) {
      salaries2.push(data.salary);
    } else if (data.salary >= 100000 && data.salary < 125000) {
      salaries3.push(data.salary);
    } else if (data.salary >= 125000 && data.salary < 150000) {
      salaries4.push(data.salary);
    } else if (data.salary > 150000 && data.salary < 175000) {
      salaries5.push(data.salary);
    } else if (data.salary > 175000) {
      salaries6.push(data.salary);
    }
  });

  console.log(salaries0);
  console.log(salaries1);
  console.log(salaries2);
  console.log(salaries3);
  console.log(salaries4);
  console.log(salaries6);

  const chartData = [
    { status: '$0 - $50,000', val: salaries0.length },
    { status: '$50,000 - $750,000', val: salaries1.length },
    { status: '$750,000 - $100,000', val: salaries2.length },
    { status: '$100,000 - $125,000', val: salaries3.length },
    { status: '$125,000 - $150,000', val: salaries4.length },
    { status: '$150,000 - $175,000', val: salaries5.length },
    { status: '$175,000+', val: salaries6.length },
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
