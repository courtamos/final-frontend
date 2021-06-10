import React from 'react';
import PropTypes from 'prop-types';

// MaterialUI Components
import { Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Custom Components

const useStyles = makeStyles({
  root: {
    height: '100px',
    backgroundColor: '#ee6a7c',
    color: 'white',
  },
});

const DashboardColumnHeading = (props) => {
  const classes = useStyles();
  const { title, color } = props;

  return (
    <Paper className={classes.root} square elevation={0}>
      <Box display="flex" className={classes.root} width={1} justifyContent="center" alignItems="center" style={{ backgroundColor: color }}>
        <Typography variant="h5" style={{ textTransform: 'uppercase' }}>
          {title}
        </Typography>
      </Box>
    </Paper>
  );
};

DashboardColumnHeading.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
};

DashboardColumnHeading.defaultProps = {
  title: 'Heading',
  color: '#ee6a7c',
};

export default DashboardColumnHeading;
