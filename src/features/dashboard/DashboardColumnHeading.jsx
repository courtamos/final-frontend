/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

import { Box, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
  },
  text: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '500',
    color: '#3b3b3b',
  },
  heading: {
    height: 'auto',
    padding: '10px',
  },
});

const DashboardColumnHeading = (props) => {
  const classes = useStyles();
  const { title, tickUrl, color } = props;

  return (
    <Box
      display="flex"
      flexDirection="column"
      style={{
        padding: '5px',
        margin: '-5px',
        marginBottom: '1px',
      }}
    >
      <Paper elevation={1} className={classes.heading}>

        <Box display="flex" alignContent="center" justifyContent="space-between">

          <Box position="absolute" style={{ marginTop: '-5px', marginLeft: '-5px' }}>
            <img src={tickUrl} alt="tick" height="20em" />
          </Box>

          <Box display="flex" flexGrow={1} className={classes.heading} justifyContent="center" alignItems="center">
            <Typography
              variant="h5"
              className={classes.text}
              style={{
                color: '3b3b3b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, fontFamily: 'Montserrat',
              }}
            >
              {title}
            </Typography>
          </Box>

        </Box>
      </Paper>
    </Box>
  );
};

DashboardColumnHeading.propTypes = {
  title: PropTypes.string,
  tickUrl: PropTypes.string,
  color: PropTypes.string,
};

DashboardColumnHeading.defaultProps = {
  title: 'Heading',
  tickUrl: 'https://i.imgur.com/rr4anU1.png',
  color: 'black',
};

export default DashboardColumnHeading;
