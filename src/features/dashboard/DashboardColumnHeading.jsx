import React from 'react';
import PropTypes from 'prop-types';

import { Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: '100px',
    backgroundColor: '#ee6a7c',
  },
  text: {
    fontFamily: 'Montserrat',
  },
});

const DashboardColumnHeading = (props) => {
  const classes = useStyles();
  const { title, color } = props;

  return (
    <Paper square elevation={0}>
      <Box display="flex" className={classes.root} width={1} justifyContent="center" alignItems="center" style={{ backgroundColor: color }}>
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
