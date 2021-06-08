import React from 'react';
import PropTypes from 'prop-types';

// React Components
import { Box } from '@material-ui/core';

// Custom Components

const DashboardColumn = (props) => {
  const { children } = props;

  return (
    <Box display="flex">
      {children}
    </Box>
  );
};

DashboardColumn.propTypes = {
  children: PropTypes.node,
};

DashboardColumn.defaultProps = {
  children: {},
};

export default DashboardColumn;
