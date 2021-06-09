import React from 'react';
import PropTypes from 'prop-types';

// React Components
import { Box } from '@material-ui/core';
import DashboardColumnHeading from './DashboardColumnHeading';
import JobItem from '../../components/JobItem';

// Custom Components

const DashboardColumn = (props) => {
  const { title, color, items } = props;

  const jobItems = items.map((item) => (
    <JobItem
      company={item.company}
      title={item.title}
      description={item.description}
      location={item.location}
    />
  ));

  return (
    <Box width={1}>
      <DashboardColumnHeading title={title} color={color} />
      <Box p={0.5}>
        {jobItems}
      </Box>

    </Box>
  );
};

DashboardColumn.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
};

DashboardColumn.defaultProps = {
  title: 'Category',
  color: '#ee6a7c',
  items: [{
    company: 'Facebook',
    title: 'Full-Stack Web Developer',
    description: 'Full Time, Remote',
    location: 'Calgary, AB',
  }],
};

export default DashboardColumn;
