import React from 'react';
import PropTypes from 'prop-types';

import { Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
  },
  text: {
    fontFamily: 'Montserrat',
  },
  heading: {
    height: '100px',
  },
});

const DashboardColumnHeading = (props) => {
  const classes = useStyles();
  const { title, color } = props;

  return (
    <Paper elevation={1} className={classes.heading} style={{ backgroundColor: color }}>
      <Box display="flex" className={classes.heading} width={1} justifyContent="center" alignItems="center">
        <Typography variant="h5" className={classes.text}>
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
