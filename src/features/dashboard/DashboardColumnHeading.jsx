import React from 'react';
import PropTypes from 'prop-types';

import { Box, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
  },
  text: {
    fontFamily: 'Montserrat',
    fontWeight: '500',
  },
  heading: {
    height: 'auto',
    padding: '10px',
  },
});

const DashboardColumnHeading = (props) => {
  const classes = useStyles();
  const { title, color } = props;

  return (
    <Box
      display="flex"
      flexDirection="column"
      style={{
        padding: '5px',
        margin: '-5px',
        marginBottom: '5px',
      }}
    >
      <Paper elevation={1} className={classes.heading}>
        <Box display="flex" className={classes.heading} justifyContent="center" alignItems="center">
          <Typography variant="h5" className={classes.text} style={{ color }}>
            {title}
          </Typography>
        </Box>
      </Paper>
    </Box>
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
