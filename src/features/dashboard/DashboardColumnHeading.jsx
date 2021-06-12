import React from 'react';
import PropTypes from 'prop-types';

import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
  },
  text: {
    fontFamily: 'Montserrat',
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
        backgroundColor: color, padding: '10px', margin: '-5px', marginBottom: '5px',
      }}
    >
      {/* <Paper elevation={1} className={classes.heading}> */}
      <Box display="flex" className={classes.heading} width={1} justifyContent="center" alignItems="center">
        <Typography variant="h4" className={classes.text}>
          {title}
        </Typography>
      </Box>
      {/* </Paper> */}
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
